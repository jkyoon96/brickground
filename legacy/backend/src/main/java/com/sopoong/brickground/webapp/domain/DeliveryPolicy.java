package com.sopoong.brickground.webapp.domain;


import java.time.LocalDateTime;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;
import lombok.*;

@Entity
@Table(name = "DELIVERYPOLICY")
@TableGenerator(name = "DELIVERY_POLICY_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "DELIVERY_POLICY_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class DeliveryPolicy {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "DELIVERY_POLICY_SEQ_GENERATOR")
	private Long deliveryPolicyId;
	
	@NonNull
	private Long shopId;
	
	private String priceMode;
	
	private Integer basePrice;
	
	private Integer baseCount;
	
	private Integer deliveryPrice;
	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public DeliveryPolicy(Long deliveryPolicyId, @NonNull Long shopId, String priceMode,
			Integer basePrice, Integer baseCount, Integer deliveryPrice, 
			LocalDateTime createDate, LocalDateTime updateDate) {
		this.deliveryPolicyId = deliveryPolicyId;
		this.shopId = shopId;
		this.priceMode = priceMode;
		this.basePrice = basePrice;
		this.baseCount = baseCount;
		this.deliveryPrice = deliveryPrice;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public DeliveryPolicy() {
		
	}
}
