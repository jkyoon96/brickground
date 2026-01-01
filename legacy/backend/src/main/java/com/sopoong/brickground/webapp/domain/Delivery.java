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
@Table(name = "DELIVERYS")
@TableGenerator(name = "DELIVERYS_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "DELIVERYS_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Delivery {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "DELIVERYS_SEQ_GENERATOR")
	private Long deliveryId;
	
	@NonNull
	private Long userId;
	
	@NonNull
	private Long shopId;
	
	private String areaNo;
	
	private String address;
	
	private String detailAddress;
	
	private String zip;
	
	private String phone;
	
	private String email;
	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public Delivery(Long deliveryId, @NonNull Long userId, @NonNull Long shopId, String areaNo,
			String address, String detailAddress, @NonNull String zip, String phone,
			String email, LocalDateTime createDate,
			LocalDateTime updateDate) {
		this.deliveryId = deliveryId;
		this.userId = userId;
		this.shopId = shopId;
		this.areaNo = areaNo;
		this.address = address;
		this.detailAddress = detailAddress;
		this.zip = zip;
		this.phone = phone;
		this.email = email;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public Delivery() {
		
	}
}
