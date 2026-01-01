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
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;
import lombok.*;

@Entity
@Table(name = "SHOPS")
@TableGenerator(name = "SHOP_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "SHOP_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Shop {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "SHOP_SEQ_GENERATOR")
	private Long shopId;
	
	@NonNull
	private String shopName;
	
	private String shopAlias;
	
	private String coverImage;
	
	private String description;
	
	@NonNull
	private Long managerId;
	
	private String shopAddress;
	
	private String shopDetailAddress;
	
	private String shopZip;
	
	private String shopTelephone;
	
	private String shopFax;
	
	private String shopEmail;
	
	@NonNull
	private String shopStatusCode;

	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@OneToMany
	@JoinColumn(name ="shopId")
	private List<Product> products = new ArrayList<Product>();
	
	@OneToMany
	@JoinColumn(name ="shopId")
	private List<VrMall> vrMalls = new ArrayList<VrMall>();
	
	
	public Shop() {
		
	}

	@Builder
	public Shop(Long shopId, @NonNull String shopName, String shopAlias, String coverImage, String description, @NonNull Long managerId, String shopAddress, String shopDetailAddress, 
			String shopZip, String shopTelephone, String shopFax, String shopEmail,  @NonNull String shopStatusCode, 
			@NonNull LocalDateTime createDate, LocalDateTime updateDate) {
		super();
		this.shopId = shopId;
		this.shopName = shopName;
		this.shopAlias = shopAlias;
		this.coverImage = coverImage;
		this.description = description;
		this.managerId = managerId;
		this.shopAddress = shopAddress;
		this.shopDetailAddress = shopDetailAddress;
		this.shopZip = shopZip;
		this.shopTelephone = shopTelephone;
		this.shopFax = shopFax;
		this.shopEmail = shopEmail;
		this.shopStatusCode = shopStatusCode;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
}
