package com.food.zone.services;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.food.zone.dto.LoginRequest;
import com.food.zone.dto.LoginResponse;
import com.food.zone.dto.ProfileResponse;
import com.food.zone.dto.RegisterRequest;
import com.food.zone.entity.Address;
import com.food.zone.entity.Role;
import com.food.zone.entity.User;
import com.food.zone.repository.AddressRepository;
import com.food.zone.repository.RoleRepository;
import com.food.zone.repository.UserRepository;
import com.food.zone.security.CustomUserDetails;
import com.food.zone.security.JwtUtils;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RoleRepository roleRepo;
	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private AuthenticationManager authManager;
	
	public User saveUser(RegisterRequest req) {
		return userRepo.save(mapRegisterReqToUser(req));
	}
	
	public LoginResponse logind(LoginRequest loginReq) {
		
		LoginResponse res = new LoginResponse();
		try {
			
			authManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
			User user = userRepo.findByEmail(loginReq.getEmail()).orElseThrow();
			CustomUserDetails userDetails = new CustomUserDetails(user);
			var jwt = jwtUtils.generateToken(userDetails);
			var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), userDetails);
			res.setUserId(user.getId());
			res.setJwtToken(jwt);
			res.setRefreshToken(refreshToken);
			res.setUserName(user.getEmail());
			res.setExpirationTime("24Hr");
		}catch(Exception ex) {
			res.setError(ex.getMessage());
		}
		
		return res;
	}
	
	public ProfileResponse fetchProfileData(String email) {
		User u = userRepo.findByEmail(email).get();
		ProfileResponse res = ProfileResponse.builder()
									.id(u.getId())
									.name(u.getName())
									.email(u.getEmail())
									.phone(u.getPhone())
									.gender(u.getGender())
									.roles(u.getRoles())
									.points(u.getPointBalance())
									.city(u.getAddress().getCity())
									.street(u.getAddress().getStreet())
									.state(u.getAddress().getState())
									.pincode(u.getAddress().getZipcode())
									.build();
		
		return res;
	}
	
	private User mapRegisterReqToUser(RegisterRequest req) {
		User u = new User();
		
		Address ad = new Address();
		ad.setCity(req.getAddressRequest().getCity());
		ad.setState(req.getAddressRequest().getState());
		ad.setStreet(req.getAddressRequest().getStreet());
		ad.setZipcode(req.getAddressRequest().getPincode());
		addressRepo.save(ad);
		
		Role r = new Role();
		r.setName("USER");
		roleRepo.save(r);
		
		Set<Role> role = new HashSet<>();
		role.add(r);
		
		u.setAddress(ad);
		u.setEmail(req.getEmail());
		u.setGender(req.getGender());
		u.setName(req.getName());
		u.setPassword(encoder.encode(req.getPassword()));
		u.setPhone(req.getPhone());
		u.setRoles(role);
		return u;
	}
	
}
