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
public class VrMallRequest {
	
	private Long vrMallId;
	private Long shopId;
	private Long categoryId; 
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
	private String backgroundPath;
	private String groundPath;
	private String cameraPosition;
	private String cameraTarget;
	private List<VrModel> vrModels;
	private int page;
	private int size;
	
}

@Getter
@Setter
class VrModel {
	private Long vrModelId;	
	private Long shopId;	
	private String vrModelType;	
	private String vrModelName;	
	private String modelPath;	
	private Material material;	
	private String normalMap;	
	private String texture;	
	private String clickable;
	private List<vrItem> instances;
}

@Getter
@Setter
class vrItem {
	
	private String key;
	private String instanceName;
	private Position position;
	private Rotation rotation;
	private Scale scale;
	private String color;
	private String assemblyLevel;
	
}

@Getter
@Setter
class Position {
	private float x;
	private float y;
	private float z;
}

@Getter
@Setter
class Scale {
	private float x;
	private float y;
	private float z;
}

@Getter
@Setter
class Rotation {
	private float _x;
	private float _y;
	private float _z;
	private String _order;
}

@Getter
@Setter
class Material {
	private float opacity;
	private boolean transparent;
	private String color;
}