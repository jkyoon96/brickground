package com.sopoong.brickground.webapp.web;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryRequest {
	
  private Long deliveryId;
  private Long userId;
  private Long shopId;
  private String areaNo;
  private String address;
  private String detailAddress;
  private String zip;
  private String phone;
  private String email;

}
