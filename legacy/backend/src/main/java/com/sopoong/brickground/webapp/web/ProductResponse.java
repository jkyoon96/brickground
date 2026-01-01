package com.sopoong.brickground.webapp.web;

import java.time.LocalDateTime;

import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.VrMall;
import com.sopoong.brickground.webapp.domain.VrMallUserRole;

import lombok.Builder;
import lombok.Data;

@Data
public class ProductResponse {

	private Long productId;	
	private Long shopId;
	private Long categoryId;
	private String productName;
	private String productFullName;
	private String vrModelName;
	private Long price;
	private Integer remainder;
	private String coverImage;
	private String description;
	private String productSetName;
	private Integer subjectId;
	private Integer levelId;
	private Integer visible;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	
	private Long vrMallUserRoleId;
	private Long roleId;
	private int	status;
	private LocalDateTime timeStart;
	private LocalDateTime timeEnd;
	
	private int page;
	private int size;
	  
	public ProductResponse(Product product) {
		
		if(product != null) {
			
			this.productId = product.getProductId();
			this.shopId = product.getShopId();
			this.categoryId = product.getCategoryId();
			this.productName = product.getProductName();
			this.productFullName = product.getProductFullName();
			this.price = product.getPrice();
			this.remainder = product.getRemainder();
			this.vrModelName = product.getVrModelName();
			this.coverImage = product.getCoverImage();
			this.description = product.getDescription();
			this.productSetName = product.getProductSetName();
			this.subjectId = product.getSubjectId();
			this.levelId = product.getLevelId();
			this.visible = product.getVisible();
			this.createDate = product.getCreateDate();
			this.updateDate = product.getUpdateDate();
		}
	}
	
	public ProductResponse(Product product, VrMallUserRole vrMallUserRole) {
		
		if(product != null) {
			
			this.productId = product.getProductId();
			this.shopId = product.getShopId();
			this.categoryId = product.getCategoryId();
			this.productName = product.getProductName();
			this.productFullName = product.getProductFullName();
			this.price = product.getPrice();
			this.remainder = product.getRemainder();
			this.vrModelName = product.getVrModelName();
			this.coverImage = product.getCoverImage();
			this.description = product.getDescription();
			this.productSetName = product.getProductSetName();
			this.levelId = product.getLevelId();
			this.visible = product.getVisible();
			this.createDate = product.getCreateDate();
			this.updateDate = product.getUpdateDate();
		}
		
		if(vrMallUserRole != null) {
			this.vrMallUserRoleId = vrMallUserRole.getVrMallUserRoleId();
			this.roleId = vrMallUserRole.getRoleId();
			this.status = vrMallUserRole.getStatus();
			this.timeStart = vrMallUserRole.getTimeStart();
			this.timeEnd = vrMallUserRole.getTimeEnd();
		}
	}
	
	
	public void setPage(int page, int size) {
		
		this.page = page;
		this.size = size;
	}
}
