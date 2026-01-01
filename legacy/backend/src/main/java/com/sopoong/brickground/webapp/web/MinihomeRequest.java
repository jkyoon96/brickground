package com.sopoong.brickground.webapp.web;


import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.google.gson.Gson;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter

public class MinihomeRequest {
	private Long minihomeId;
	private Long shopId;
	private Long categoryId; 
	private String minihomeName;
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
	private int plateDotCount;
	private boolean fenceMode;
	private int groundColorId;
	private List<MinihomeModel> vrModels;
	private int page;
	private int size;
}

@Getter
@Setter
class MinihomeModel {
	private Long vrModelId;	
	private Long shopId;	
	private String vrModelType;	
	private String vrModelName;	
	private String modelPath;	
	private Material material;	
	private String normalMap;	
	private String texture;	
	private String clickable;
	private List<minihomeItem> instances;
}

@Getter
@Setter
class minihomeItem {
	
	private String key;
	private String instanceName;
	private Position position;
	private Rotation rotation;
	private Scale scale;
	private String color;
	private String assemblyLevel;
	private String image;
	private String link;
	
}
