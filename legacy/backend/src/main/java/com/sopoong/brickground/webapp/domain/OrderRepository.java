package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {
	
	@Query("select u from Order u where u.orderSummaryId = ?1")
	List<Order> findAllBySummaryId(Long summaryId);
}
