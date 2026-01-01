package com.sopoong.brickground.webapp.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface VrMallUserRoleRepository extends CrudRepository<VrMallUserRole, Long> {
	
	List<VrMallUserRole> findAll(Pageable pageable);
	
	List<VrMallUserRole> findAllByUserId(Long userId);
	
	Optional<VrMallUserRole> findByVrMallIdAndUserId(Long vrMallId, Long userId);
	
}
