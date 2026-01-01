package com.sopoong.brickground.webapp.domain.creation;


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
import org.json.simple.JSONObject;

import lombok.*;

@Entity
@Table(name = "CREATIONS")
@TableGenerator(name = "CREATION_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "CREATION_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Creation {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "CREATION_SEQ_GENERATOR")
	private Long creationId;
	
	@NonNull
	private Long shopId;
	
	@NonNull
	private Long categoryId;
	
	@NonNull
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
	
	private String vrModels;
	
	private Long userId;
	
	private String userName;
	
	private int blacklistMode;
	
	private Integer subjectId;
	  
	private Integer sizeId;
	  
	private String sizeName;
	
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public Creation(Long creationId, @NonNull Long shopId, @NonNull Long categoryId, @NonNull String creationName, String description,
			int visible, String coverImage, String videoData, String setNames,
			int viewCount, int likeCount, int shareCount, int cloneCount, int commentCount, 
			Long rootId, Long parentId, String vrModels, Long userId, String userName, 
			int blacklistMode, Integer subjectId, Integer sizeId, String sizeName, LocalDateTime createDate, LocalDateTime updateDate) {
		this.creationId = creationId;
		this.shopId = shopId;
		this.categoryId = categoryId;
		this.creationName = creationName;
		this.description = description;
		this.visible = visible;		
		this.coverImage = coverImage;
		this.videoData = videoData;
		this.setNames = setNames;
		this.viewCount = viewCount;
		this.likeCount = likeCount;
		this.shareCount = shareCount;
		this.cloneCount = cloneCount;
		this.commentCount = commentCount;
		this.rootId = rootId;
		this.parentId = parentId;
		this.vrModels = vrModels;
		this.userId = userId;
		this.userName = userName;
		this.blacklistMode = blacklistMode;
		this.subjectId = subjectId;
	    this.sizeId = sizeId;
	    this.sizeName = sizeName;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public Creation() {
		
	}
}
