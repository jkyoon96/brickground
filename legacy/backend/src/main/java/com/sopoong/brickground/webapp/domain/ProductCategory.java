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
@Table(name = "PRODUCTCATEGORY")
@TableGenerator(name = "PRODUCTCATEGORY_SEQ_GENERATOR",
table = "APPSEQUENCES",
pkColumnValue = "PRODUCTCATEGORY_SEQ",
allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class ProductCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "PRODUCTCATEGORY_SEQ_GENERATOR")
	private Long categoryId;
	
	@NonNull
	private Long productId;
	
	@NonNull
	private Long shopId;

	private Integer categoryOne;

	private Integer categoryTwo;

	private Integer categoryThree;

	private Integer categoryFour;

	private Integer categoryFive;
	
	
	@Builder
	public ProductCategory(Long productId, @NonNull Long shopId, @NonNull Integer categoryOne, 
			Integer categoryTwo, Integer categoryThree, Integer categoryFour, Integer categoryFive) {
		this.productId = productId;
		this.shopId = shopId;
		this.categoryOne = categoryOne;
		this.categoryTwo = categoryTwo;
		this.categoryThree = categoryThree;
		this.categoryFour = categoryFour;
		this.categoryFive = categoryFive;
		
	}
	
	public ProductCategory() {
		
	}
}
