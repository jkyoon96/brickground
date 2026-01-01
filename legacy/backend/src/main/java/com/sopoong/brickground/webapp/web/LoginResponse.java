package com.sopoong.brickground.webapp.web;

import java.time.LocalDateTime;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.User;
import com.sopoong.brickground.webapp.domain.VrMall;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
public class LoginResponse {

	private long userId;
	private String userName;
	private String userNickname;
	private String email;
	private long shopId;	
	private int role;
	private long point;
	private int createMode;
	private String avatarModel;
	private String sessionId;
	private int resultCode;
	
	public LoginResponse(User user, HttpSession session, int resultCode) {

		if(user != null) {
			this.userId = user.getUserId();
			this.userName = user.getUserName();
			this.userNickname = user.getUserNickname();
			this.email = user.getEmail();
			this.shopId = user.getShopId();
			this.role = user.getRole();
			this.point = user.getPoint();
			this.createMode = user.getCreateMode();
			this.avatarModel = user.getAvatarModel();
		}
		
		if(session != null) {
			this.sessionId = session.getId();
		}
		
		this.resultCode = resultCode;
		
	}
	
	public LoginResponse() {	}
	
}
