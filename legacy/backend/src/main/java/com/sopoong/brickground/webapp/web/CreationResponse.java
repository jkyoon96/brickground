package com.sopoong.brickground.webapp.web;


import java.time.LocalDateTime;
import java.util.List;

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
import org.json.simple.JSONObject;

import com.sopoong.brickground.webapp.domain.Delivery;
import com.sopoong.brickground.webapp.domain.creation.Creation;

import lombok.*;

@Data
public class CreationResponse {

	private Long creationId;
	private Long shopId;
	private Long categoryId; 
	private String creationName;
	private String description;
	private int visible;
	private String coverImage;
	private String videoData;
	private String setNames;
	private int viewCount;
	private int likeCount;
	private int shareCount;
	private int cloneCount;
	private int commentCount;
	private Long rootId;
	private Long parentId;
	private Long userId;
	private String userName;
	private int blacklistMode;
	private String vrModels;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	private int page;
	private int size;
	

	public CreationResponse(Creation creation, Boolean vrModelFlag) {
		this.creationId = creation.getCreationId();
		this.shopId = creation.getShopId();
		this.categoryId = creation.getCategoryId();
		this.creationName = creation.getCreationName();
		this.description = creation.getDescription();
		this.visible = creation.getVisible();		
		this.coverImage = creation.getCoverImage();
		this.videoData = creation.getVideoData();
		this.setNames = creation.getSetNames();
		this.viewCount = creation.getViewCount();
		this.likeCount = creation.getLikeCount();
		this.shareCount = creation.getShareCount();
		this.cloneCount = creation.getCloneCount();
		this.commentCount = creation.getCommentCount();
		this.rootId = creation.getRootId();
		this.parentId = creation.getParentId();
		
		if(vrModelFlag)
			this.vrModels = creation.getVrModels();
		
		this.userId = creation.getUserId();
		this.userName = creation.getUserName();
		this.blacklistMode = creation.getBlacklistMode();
		this.createDate = creation.getCreateDate();
		this.updateDate = creation.getUpdateDate();
	}
	
	public CreationResponse() {
		
	}
}
