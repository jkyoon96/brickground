package com.sopoong.brickground.webapp.domain;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;
import lombok.*;

@Entity
@Table(name = "USERS")
@TableGenerator(name = "USER_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "USER_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "USER_SEQ_GENERATOR")
	private Long userId;
	
	@NonNull
	private String userName;
	
	@NonNull
	private String password;
	
	@NonNull
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
	
	@NonNull
	private String email;
	
	private String userStatusCode;
	
	private int role;
	
	private Long point;
	
	private String firebaseId;
	
	private String ipAddress;
	
	private int maxSession;
	
	private int createMode;
	
	private String avatarModel;

	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	
	public User() {
		
	}

	@Builder
	public User(Long userId, @NonNull String userName, @NonNull String password, @NonNull Long shopId, 
			String userNickname, String ihidnum, String birthday,
			String address, String detailAddress,String zip, String telephone, String mobile,
			@NonNull String email, String userStatusCode, int role, Long point, String firebaseId, String ipAddress, int maxSession,
			int createMode, String avatarModel, @NonNull LocalDateTime createDate, LocalDateTime updateDate) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.shopId = shopId;
		this.userNickname = userNickname;
		this.ihidnum = ihidnum;
		this.birthday = birthday;
		this.address = address;
		this.detailAddress = detailAddress;
		this.zip = zip;
		this.telephone = telephone;
		this.mobile = mobile;
		this.email = email;
		this.userStatusCode = userStatusCode;
		this.role = role;
		this.point = point;
		this.firebaseId = firebaseId;
		this.ipAddress = ipAddress;
		this.createMode = createMode;
		this.avatarModel = avatarModel;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
}
