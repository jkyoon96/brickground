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
import org.json.simple.JSONObject;

import lombok.*;

@Entity
@Table(name = "VRMALLS")
@TableGenerator(name = "VRMALL_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "VRMALL_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class VrMall {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "VRMALL_SEQ_GENERATOR")
	private Long vrMallId;
	
	@NonNull
	private Long shopId;
	
	@NonNull
	private Long categoryId;
	
	@NonNull
	private String vrMallName;
	
	private String description;
	
	private int visible;
	
	private String introImage;
	
	private String coverImage;
	
	private String videoImage;
	
	private String videoData;
	
	private String manualData;
	
	private String programData;
	
	private String setNames;
	
	private int viewCount;
	
	private int likeCount;
	
	private int commentCount;
	
	private String backgroundPath;
	
	private String groundPath;
	
	private String cameraPosition;
	
	private String cameraTarget;
	
	private String vrModels;
	
	
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public VrMall(Long vrMallId, @NonNull Long shopId, @NonNull Long categoryId, @NonNull String vrMallName, String description,
			int visible, String introImage, String coverImage, String videoImage, String videoData, String manualData, String programData, String setNames,
			int viewCount, int likeCount, int commentCount, String backgroundPath, String groundPath, String cameraPosition,
			String cameraTarget, String vrModels, LocalDateTime createDate, LocalDateTime updateDate) {
		this.vrMallId = vrMallId;
		this.shopId = shopId;
		this.categoryId = categoryId;
		this.vrMallName = vrMallName;
		this.description = description;
		this.visible = visible;
		this.introImage = introImage;		
		this.coverImage = coverImage;
		this.videoImage = videoImage;
		this.videoData = videoData;
		this.manualData = manualData;
		this.programData = programData;
		this.setNames = setNames;
		this.viewCount = viewCount;
		this.likeCount = likeCount;
		this.commentCount = commentCount;
		this.backgroundPath = backgroundPath;
		this.backgroundPath = groundPath;
		this.cameraPosition = cameraPosition;
		this.cameraTarget = cameraTarget;
		this.vrModels = vrModels;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public VrMall() {
		
	}
}
