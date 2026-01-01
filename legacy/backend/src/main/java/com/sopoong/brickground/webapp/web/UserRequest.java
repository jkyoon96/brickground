package com.sopoong.brickground.webapp.web;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
	
	private Long userId;
	private Long shopId;
	private String userName;
	private String password;
	private String userNickname;
	private String email;
	private String mobile;
	private String accessToken;
	private String newPassword;
	private int page;
	private int size;
	
}
