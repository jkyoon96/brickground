package com.sopoong.brickground.webapp.web;

import java.time.LocalDateTime;

import org.json.simple.JSONObject;

import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.VrMall;
import com.sopoong.brickground.webapp.domain.VrMallUserRole;

import lombok.Builder;
import lombok.Data;

@Data
public class VrMallResponse {

	private Long vrMallId;
	private Long shopId;	
	private Long categoryId;
	private String vrMallName;
	private String description;
	private String introImage;
	private String coverImage;
	private String videoImage;
	private String videoData;
	private String manualData;
	private String programData;
	private String setNames;
	private int visible;
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
	
	private int page;
	private int size;
	
	public VrMallResponse(VrMall vrMall) {
		
		if(vrMall != null) {
		
			this.vrMallId = vrMall.getVrMallId();
			this.shopId = vrMall.getShopId();
			this.categoryId = vrMall.getCategoryId();
			this.vrMallName = vrMall.getVrMallName();
			this.description = vrMall.getDescription();
			this.introImage = vrMall.getIntroImage();
			this.coverImage = vrMall.getCoverImage();
			this.videoImage = vrMall.getVideoImage();
			this.videoData = vrMall.getVideoData();
			this.manualData = vrMall.getManualData();
			this.programData = vrMall.getProgramData();
			this.setNames = vrMall.getSetNames();
			this.visible = vrMall.getVisible();
			this.viewCount = vrMall.getViewCount();
			this.likeCount = vrMall.getLikeCount();
			this.commentCount = vrMall.getCommentCount();
			this.backgroundPath = vrMall.getBackgroundPath();
			this.groundPath = vrMall.getGroundPath();
			this.cameraPosition = vrMall.getCameraPosition();
			this.cameraTarget = vrMall.getCameraTarget();
			this.vrModels = vrMall.getVrModels();
			this.createDate = vrMall.getCreateDate();
			this.updateDate = vrMall.getUpdateDate();
		}
		
	}
	
	
	public void setPage(int page, int size) {
		
		this.page = page;
		this.size = size;
	}
}
