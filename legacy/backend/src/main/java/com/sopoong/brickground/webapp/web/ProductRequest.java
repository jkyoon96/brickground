package com.sopoong.brickground.webapp.web;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {
	
  private Long shopId;
  private String productName;
  private String productFullName;
  private Long categoryId;
  private Long price; 
  private Integer remainder; 
  private String vrModelName;
  private String coverImage;
  private String description;
  private String productSetName;
  private Integer subjectId;
  private Integer levelId;
  private Integer visible;
  private int page;
  private int size;
}
