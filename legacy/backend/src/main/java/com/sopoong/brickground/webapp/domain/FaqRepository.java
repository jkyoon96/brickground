package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface FaqRepository extends CrudRepository<Faq, Long> {
	
	List<Faq> findAllByShopId(Long shopId);
	
	List<Faq> findAll(Pageable pageable);
	
}
