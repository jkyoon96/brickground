package com.sopoong.brickground.webapp.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface DeliveryRepository extends CrudRepository<Delivery, Long> {
	
	@Query("select u from Delivery u where u.userId = ?1")
	List<Delivery> findAllByUserId(Long userId);
	
	Optional<Delivery> findByAddressAndDetailAddressAndPhoneAndEmail(String address, String detailAddress, String phone, String email);
	
	
}
