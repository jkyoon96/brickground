package com.sopoong.brickground.webapp.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<Cart, Long> {
	
	List<Cart> findAllByShopIdAndUserIdAndOrderState(Long shopId, Long userId, String orderState);
	
	Optional<Cart> findByShopIdAndUserIdAndProductIdAndOrderState(Long shopId, Long userId, Long productId, String orderState);
}
