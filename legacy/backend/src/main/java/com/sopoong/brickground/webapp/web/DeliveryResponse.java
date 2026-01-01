package com.sopoong.brickground.webapp.web;

import java.time.LocalDateTime;

import org.json.simple.JSONObject;

import com.sopoong.brickground.webapp.domain.Delivery;
import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.VrMall;

import lombok.Builder;
import lombok.Data;

@Data
public class DeliveryResponse {

	private Long deliveryId;
	private String address;
	private String detailAddress;
	private String zip;
	private String phone;
	private String email;	
	private int page;
	private int size;
	
	public DeliveryResponse() {	}
	
	public DeliveryResponse(Delivery delivery) {
		
		if(delivery == null)
			return;
		
		this.deliveryId = delivery.getDeliveryId();
		this.address = delivery.getAddress();
		this.detailAddress = delivery.getDetailAddress();
		this.zip = delivery.getZip();
		this.phone = delivery.getPhone();
		this.email = delivery.getEmail();
		
	}
	
	public void setPage(int page, int size) {
		
		this.page = page;
		this.size = size;
	}
}
