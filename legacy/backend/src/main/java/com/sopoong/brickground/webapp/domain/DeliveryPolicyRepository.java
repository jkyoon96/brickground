package com.sopoong.brickground.webapp.domain;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface DeliveryPolicyRepository extends CrudRepository<DeliveryPolicy, Long> {
	
	Optional<DeliveryPolicy> findByShopId(Long shopId);
	
}
