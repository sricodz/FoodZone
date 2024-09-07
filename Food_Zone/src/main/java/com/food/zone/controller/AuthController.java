package com.food.zone.controller;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.zone.dto.ChangePassword;
import com.food.zone.dto.LoginRequest;
import com.food.zone.dto.LoginResponse;
import com.food.zone.dto.MailBody;
import com.food.zone.dto.ProfileResponse;
import com.food.zone.dto.RegisterRequest;
import com.food.zone.entity.ForgotPassword;
import com.food.zone.entity.User;
import com.food.zone.repository.ForgotPasswordRepository;
import com.food.zone.repository.UserRepository;
import com.food.zone.services.AuthService;
import com.food.zone.services.EmailService;

import jakarta.servlet.http.HttpServletResponseWrapper;
import jakarta.validation.Valid;

@RestController
public class AuthController {

	@Autowired
	private  UserRepository userRepo;
	
	@Autowired
	private ForgotPasswordRepository forgotRepo;
	
	@Autowired
	private AuthService authServ;
	
	@Autowired
	private EmailService emailServ;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@PostMapping("/auth/signup")
	public ResponseEntity<User> createUser(@RequestBody @Valid RegisterRequest req){
		return new ResponseEntity<User>(authServ.saveUser(req), HttpStatus.CREATED);
	}
	
	@PostMapping("/auth/signin")
	public ResponseEntity<LoginResponse> signIn(@RequestBody LoginRequest req,HttpServletResponseWrapper response){
		LoginResponse res = authServ.logind(req);
		
		//create jwt token cookie
		jakarta.servlet.http.Cookie jwtCookie = new jakarta.servlet.http.Cookie("token",res.getJwtToken());
		jwtCookie.setHttpOnly(true);
		jwtCookie.setSecure(true);
		jwtCookie.setPath("/");
		jwtCookie.setMaxAge(3600);
		
		//create refresh token cookie
		jakarta.servlet.http.Cookie refreshCookie = new jakarta.servlet.http.Cookie("refreshToken",res.getRefreshToken());
		refreshCookie.setHttpOnly(true);
		refreshCookie.setSecure(true);
		refreshCookie.setPath("/");
		refreshCookie.setMaxAge(7*24*3600);
		
		//Add cookies to the response
		response.addCookie(refreshCookie);
		response.addCookie(jwtCookie);
		
		return new ResponseEntity<LoginResponse>(res, HttpStatus.ACCEPTED);
	}
	
	/**
	 * From react they call this api to confirm whether the user is authenticated or not
	 * */
	@GetMapping("/auth/checkAuth")
	public ResponseEntity<String> checkAuth(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth!=null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)) {
			return new ResponseEntity("Authenticated",HttpStatus.OK);
		}
		return new ResponseEntity<String>("UnAuthenticated", HttpStatus.UNAUTHORIZED);
	}
	
	/** This method is to used to send otp for the forgot password flow . 
	 * 	when user submit with email check if email exists send otp to that email.
	 *  */
	@PostMapping("/auth/verifyMail/{email}")
	public ResponseEntity<String> forgotPasswordVerifyEmail(@PathVariable String email){
		
		User user = userRepo.findByEmail(email)
						.orElseThrow(()->new UsernameNotFoundException("Please provide an valid Email!"));
		int otp = otpGenerator();
		MailBody mailBody = MailBody.builder()
									.to(email)
									.text("This is the OTP for your Forgot Password request :: "+otp)
									.subject("OTP for Forgot Password request")
									.build();
		ForgotPassword fp = ForgotPassword.builder()
											.otp(otp)
											.expireTime(new Date(System.currentTimeMillis()+70*1000))
											.user(user)
											.build();
		emailServ.sendSimpleMessage(mailBody);
		forgotRepo.save(fp);
		
		return new ResponseEntity<String>("Email Sent for Verification", HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/auth/verifyOtp/{otp}/{email}")
	public ResponseEntity<String> verifyOtp(@PathVariable Integer otp,@PathVariable String email){
		User user = userRepo.findByEmail(email)
							.orElseThrow(()->new UsernameNotFoundException("Please provide a valid email"));
		ForgotPassword fp = forgotRepo.findByOtpAndUser(otp, user)
									.orElseThrow(()->new RuntimeException("Invalid OTP for Email :: "+user.getEmail()));
		if(fp.getExpireTime().before(Date.from(Instant.now()))) {
			forgotRepo.deleteById(fp.getId());
			return new ResponseEntity<String>("OTP has Expired", HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<String>("OTP Verified", HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/auth/changePassword/{email}")
	public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,@PathVariable String email){
		System.out.println("The inside changePassword ---------------->");
		
		if(!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
			return new ResponseEntity<String>("Both Passwords are not matching", HttpStatus.EXPECTATION_FAILED) ;
		}
		String encodedPass = encoder.encode(changePassword.password());
		userRepo.updatePassword(email, encodedPass);
		return new ResponseEntity<String>("Password has been Changed!", HttpStatus.ACCEPTED);
	}
	
	/**
	 * The below endpoint is secured and used to get the profile information
	 * */
	@GetMapping("/v1/api/profileData/{email}")
	public ResponseEntity<ProfileResponse> getProfileData(@PathVariable("email") String email){
		return new ResponseEntity<ProfileResponse>(authServ.fetchProfileData(email), HttpStatus.OK);
	}
	
	private Integer otpGenerator() {
		Random random = new Random();
		return random.nextInt(100000, 999999);
	}
}
