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
@Table(name = "PRODUCTS")
@TableGenerator(name = "PRODUCT_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "PRODUCT_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "PRODUCT_SEQ_GENERATOR")
	private Long productId;
	
	@NonNull
	private Long shopId;
	
	@NonNull
	private Long categoryId;
	
	@NonNull
	private String productName;
	
	private String productFullName;
	
	@NonNull
	private Long price;
	
	@NonNull
	private Integer remainder;
	
	private String vrModelName;
	
	private String coverImage;
	
	private String description;
	
	private String productSetName;
	
	private Integer subjectId;
	
	private Integer levelId;
	
	private Integer visible;
	
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public Product(Long productId, @NonNull Long shopId, @NonNull Long categoryId, @NonNull String productName, String productFullName,
			@NonNull Long price, @NonNull Integer remainder, String vrModelName,String coverImage, String description,
			String productSetName, Integer subjectId, Integer levelId, Integer visible, LocalDateTime createDate, LocalDateTime updateDate) {
		this.productId = productId;
		this.shopId = shopId;
		this.categoryId = categoryId;
		this.productName = productName;
		this.productFullName = productFullName;
		this.price = price;
		this.remainder = remainder;
		this.vrModelName = vrModelName;
		this.coverImage = coverImage;
		this.description = description;
		this.productSetName = productSetName;
		this.subjectId = subjectId;
		this.levelId = levelId;
		this.visible = visible;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public Product() {
		
	}
}
