package com.food.zone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.zone.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

}
