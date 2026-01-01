package com.sopoong.brickground.webapp.domain;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Entity
@Table(name = "ORDERSUMMARY")
@TableGenerator(name = "ORDERSUMMARY_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "ORDERSUMMARY_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class OrderSummary {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ORDERSUMMARY_SEQ_GENERATOR")
	private Long orderSummaryId;
	
	@NonNull
	private Long userId;
	
	private String userName;
	
	@NonNull
	private Long shopId;
	
	@NonNull
	private Long deliveryId;
	
	private String address;
	
	private String detailAddress;
	
	private String zip;
	
	private String phone;
	
	private String email;
	
	private String orderName;
	
	@NonNull
	private Integer orderCount;
	
	@NonNull
	private Long totalPrice;
	
	private Long payedMoney;
	
	private Long payedPoint;
	
	private Long bonusPoint;
	
	@NonNull
	private Long deliveryPrice;
	
	@NonNull
	private String deliveryState;
	
	@NonNull
	private String confirmState;
	
	private String impUid;
	
	private String merchantUid;
	
	private String applyNumber;
	
	private String invoiceNumber;
	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@OneToMany
	@JoinColumn(name ="orderSummaryId")
	private List<Order> orders = new ArrayList<Order>();
	
	
	@Builder
	public OrderSummary(Long orderSummaryId, @NonNull Long userId, String userName, @NonNull Long shopId, @NonNull Long deliveryId, 
			String address, String detailAddress, String zip, String phone, String email, String orderName,
			@NonNull Integer orderCount, @NonNull Long totalPrice, Long payedMoney, Long payedPoint, Long bonusPoint,
			@NonNull Long deliveryPrice, @NonNull String deliveryState, @NonNull String confirmState,
			String impUid, String merchantUid, String applyNumber,
			String invoiceNumber, @NonNull LocalDateTime createDate, LocalDateTime updateDate) {
		this.orderSummaryId = orderSummaryId;
		this.userId = userId;
		this.userName = userName;
		this.shopId = shopId;
		this.deliveryId = deliveryId;
		this.address = address;
		this.detailAddress = detailAddress;
		this.zip = zip;
		this.phone = phone;
		this.email = email;
		this.orderName = orderName;
		this.orderCount = orderCount;
		this.totalPrice = totalPrice;
		this.payedMoney = payedMoney;
		this.payedPoint = payedPoint;
		this.bonusPoint = bonusPoint;
		this.deliveryPrice = deliveryPrice;
		this.deliveryState = deliveryState;  // P: 배송준비 , S: 배송시작, F: 배송완료, C: 주문취소
		this.confirmState = confirmState;
		this.impUid = impUid;
		this.merchantUid = merchantUid;
		this.applyNumber = applyNumber;
		this.invoiceNumber = invoiceNumber;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public OrderSummary() {
		
	}
}
