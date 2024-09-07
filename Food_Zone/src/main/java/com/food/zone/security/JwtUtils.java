package com.food.zone.security;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtUtils {

	private SecretKey key;
	private static final long EXPIRATION_TIME = 86400000; //24hours or 86400000 milisecs
	
	public JwtUtils() {
		String secretString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
		byte[] keyBytes = Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
		this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
	}
	
	private <T> T extractClaims(String token,Function<Claims, T> claimsTFunction) {
		return claimsTFunction.apply(
					Jwts
						.parser()
						.verifyWith(key)
						.build()
						.parseSignedClaims(token)
						.getPayload()
				);
	}
	
	public String extractUserName(String token) {
		return extractClaims(token, Claims::getSubject);
	}
	
	public String generateToken(UserDetails userDetails) {
		return Jwts
					.builder()
					.subject(userDetails.getUsername())
					.issuedAt(new Date(System.currentTimeMillis()))
					.expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
					.signWith(key)
					.compact();
	}
	
	public String generateRefreshToken(HashMap<String, Object>claims, UserDetails userDetails) {
		return Jwts
					.builder()
					.claims(claims)
					.subject(userDetails.getUsername())
					.issuedAt(new Date(System.currentTimeMillis()))
					.expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
					.signWith(key)
					.compact();
	}
	
	public boolean isTokenValid(String token,UserDetails userDetails) {
		final String userName = extractUserName(token);
		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	private boolean isTokenExpired(String token) {
		return extractClaims(token, Claims::getExpiration).before(new Date());
	}
}
