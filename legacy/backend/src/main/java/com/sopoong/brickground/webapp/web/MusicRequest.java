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
public class MusicRequest {
	
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
	private MusicModel vrModels;
	private int page;
	private int size;
	
}


@Getter
@Setter
class MusicModel {
	private int measure;	
	private int tempo;
	private String melodyPlayer;
	private String beatPlayer;
	private String vocalPlayer;
	private List<musicItem> instances;
}

@Getter
@Setter
class musicItem {
	private String instanceName;
	private String pitch;
	private int color;	
	
}