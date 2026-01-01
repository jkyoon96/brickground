package com.sopoong.brickground.webapp.web;

import java.time.LocalDateTime;

import org.json.simple.JSONObject;

import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.User;
import com.sopoong.brickground.webapp.domain.VrMall;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
public class UserResponse {

	private Long userId;
	private String userName;
	private String password;
	private Long shopId;
	private String userNickname;
	private String ihidnum;
	private String sexdstnCode;
	private String birthday;
	private String areaNo;
	private String address;
	private String detailAddress;
	private String zip;
	private String telephone;
	private String mobile;
	private String email;
	private String userStatusCode;
	private int role;
	private Long point;
	private String firebaseId;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	private int page;
	private int size;
	
	public UserResponse(User user) {
		
		if(user == null)
			return;
		
		this.userId = user.getUserId();
		this.userName = user.getUserName();
		this.shopId = user.getShopId();
		this.userNickname = user.getUserNickname();
		this.ihidnum = user.getIhidnum();
		this.sexdstnCode = user.getSexdstnCode();
		this.birthday = user.getBirthday();
		this.areaNo = user.getAreaNo();
		this.address = user.getAddress();
		this.detailAddress = user.getDetailAddress();
		this.zip = user.getZip();
		this.telephone = user.getTelephone();
		this.mobile = user.getMobile();
		this.email = user.getEmail();
		this.userStatusCode = user.getUserStatusCode();
		this.role = user.getRole();
		this.point = user.getPoint();
		this.firebaseId = user.getFirebaseId();
		this.createDate = user.getCreateDate();
		this.updateDate = user.getUpdateDate();
		
	}
	
	public UserResponse() {	}
	
	public void setPage(int page, int size) {
		
		this.page = page;
		this.size = size;
	}
	
}
