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
@Table(name = "VRMODELS")
@TableGenerator(name = "VRMODEL_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "VRMODEL_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class VrModel {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "VRMODEL_SEQ_GENERATOR")
	private Long vrModelId;
	
	@NonNull
	private Long shopId;
	
	@NonNull
	private String vrModelType;
	
	@NonNull
	private String vrModelName;
	
	private String setName;
	
	private int sortId;
	
	@NonNull
	private String modelPath;
	
	private String imagePath;
	
	private String description;
	
	private String material;
	
	private String normalMap;
	
	private String texture;
	
	private String clickable;
	
	
	@Builder
	public VrModel(Long vrModelId, @NonNull Long shopId, @NonNull String vrModelType, @NonNull String vrModelName,
			String setName, int sortId, @NonNull String modelPath, String imagePath,  String description,
			String material, String normalMap, String texture, String clickable) {
		this.vrModelId = vrModelId;
		this.shopId = shopId;
		this.vrModelType = vrModelType;
		this.vrModelName = vrModelName;
		this.setName = setName;
		this.sortId = sortId;
		this.modelPath = modelPath;
		this.imagePath = imagePath;
		this.description = description;
		this.material = material;
		this.normalMap = normalMap;
		this.texture = texture;
		this.clickable = clickable;
	}
	
	public VrModel() {
		
	}
}
