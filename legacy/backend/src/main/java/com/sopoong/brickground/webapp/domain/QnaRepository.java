package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface QnaRepository extends CrudRepository<Qna, Long> {
	
	List<Qna> findAllByShopIdAndUserId(Long shopId, Long userId);
	
	Long countByUserId(Long userId);
	
	List<Qna> findAllByUserId(Long userId, Pageable pageable);
}
