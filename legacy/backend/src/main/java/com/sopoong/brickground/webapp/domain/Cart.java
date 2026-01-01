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
@Table(name = "CARTS")
@TableGenerator(name = "CARTS_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "CARTS_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "CARTS_SEQ_GENERATOR")
	private Long cartId;
		
	@NonNull
	private Long userId;
	
	@NonNull
	private Long shopId;
	
	@NonNull
	private Long productId;
	
	private Long categoryId;
	
	@NonNull
	private String productName;
	
	@NonNull
	private String coverImage;
	
	@NonNull
	private Integer count;
	
	@NonNull
	private Long price;
	
	@NonNull
	private String orderState;
	
	private Long vrMallId;
	
	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public Cart(Long cartId, @NonNull Long userId, @NonNull Long shopId, @NonNull Long productId, Long categoryId, 
			@NonNull String productName, @NonNull String coverImage, @NonNull Integer count,	
			@NonNull Long price, @NonNull String orderState, Long vrMallId,
			@NonNull LocalDateTime createDate, LocalDateTime updateDate) {
		this.cartId = cartId;
		this.userId = userId;
		this.shopId = shopId;
		this.productId = productId;
		this.categoryId = categoryId;
		this.productName = productName;
		this.coverImage = coverImage;
		this.count = count;
		this.price = price;
		this.orderState = orderState;  // W: Waiting (대기중), C: Completed (주문완료) , D: Delete (삭제)
		this.vrMallId = vrMallId;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public Cart() {
		
	}
}
