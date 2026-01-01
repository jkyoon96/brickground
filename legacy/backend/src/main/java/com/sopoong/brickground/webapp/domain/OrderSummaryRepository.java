package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface OrderSummaryRepository extends CrudRepository<OrderSummary, Long> {
	
	@Query("select u from OrderSummary u where u.userId = ?1")
	List<OrderSummary> findAllByUserId(Long userId, Pageable pageable);
	
	@Query("select u from OrderSummary u where u.shopId = ?1")
	List<OrderSummary> findAllByShopId(Long shopId, Pageable pageable);
	
	@Query("select count(u.orderSummaryId) from OrderSummary u where u.shopId = ?1")
	long countByShopId(Long shopId);
	
	@Query("select count(u.orderSummaryId) from OrderSummary u where u.userId = ?1")
	long countByUserId(Long userId);
}
