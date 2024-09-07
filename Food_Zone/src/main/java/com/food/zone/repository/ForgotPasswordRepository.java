package com.food.zone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.food.zone.entity.ForgotPassword;
import com.food.zone.entity.User;

@Repository
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer>{

	@Query("select fp from ForgotPassword fp where fp.otp=:otp and fp.user=:user")
	Optional<ForgotPassword> findByOtpAndUser(@Param("otp") Integer otp,@Param("user") User user);
}
