package com.sopoong.brickground.webapp.domain;


import java.time.LocalDateTime;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;
import lombok.*;

@Entity
@Table(name = "NOTICES")
@TableGenerator(name = "NOTICES_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "NOTICES_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Notice {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "NOTICES_SEQ_GENERATOR")
	private Long noticeId;
	
	@NonNull
	private Long userId;
	
	@NonNull
	private Long shopId;
	
	private String noticeType;
	
	private String noticeTitle;
	
	private String noticeDescription;
	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public Notice(Long noticeId, @NonNull Long userId, @NonNull Long shopId, String noticeType,
			String noticeTitle, String noticeDescription, LocalDateTime createDate,	LocalDateTime updateDate) {
		this.noticeId = noticeId;
		this.userId = userId;
		this.shopId = shopId;
		this.noticeType = noticeType;
		this.noticeTitle = noticeTitle;
		this.noticeDescription = noticeDescription;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public Notice() {
		
	}
}
