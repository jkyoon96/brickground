package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface NoticeRepository extends CrudRepository<Notice, Long> {
	
	List<Notice> findAllByShopId(Long shopId);
	
	List<Notice> findAll(Pageable pageable);
	
}
