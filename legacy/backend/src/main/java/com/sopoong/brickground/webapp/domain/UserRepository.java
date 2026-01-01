package com.sopoong.brickground.webapp.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
	
	@Query("select u from User u where u.shopId = ?1")
	List<User> findUserByShopId(Long shopId, Pageable pageable);
	
	@Query("select u from User u where u.email = ?1")
	User findUserByEmail(String email);
	
	@Query("select u from User u where u.role > 1 and u.firebaseId != null")
	List<User> findUserByFirebaseId();
	
}
