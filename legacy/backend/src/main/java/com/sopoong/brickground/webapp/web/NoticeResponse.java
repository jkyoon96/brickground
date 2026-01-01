package com.sopoong.brickground.webapp.web;

import java.time.LocalDateTime;

import org.json.simple.JSONObject;

import com.sopoong.brickground.webapp.domain.Delivery;
import com.sopoong.brickground.webapp.domain.Notice;
import com.sopoong.brickground.webapp.domain.Product;
import com.sopoong.brickground.webapp.domain.VrMall;

import lombok.Builder;
import lombok.Data;

@Data
public class NoticeResponse {

	private Long noticeId;
	private Long shopId;
	private Long userId;
	private String noticeType;
	private String noticeTitle;
	private String noticeDescription;	
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	private int page;
	private int size;
	
	public NoticeResponse(Notice notice) {	
		
		if(notice == null)
			return;
		
		this.noticeId = notice.getNoticeId();
		this.shopId = notice.getShopId();
		this.userId = notice.getUserId();
		this.noticeType = notice.getNoticeType();
		this.noticeTitle = notice.getNoticeTitle();
		this.noticeDescription = notice.getNoticeDescription();
		this.createDate = notice.getCreateDate();
		this.updateDate = notice.getUpdateDate();
		
	}
	
	public void setPage(int page, int size) {	
		this.page = page;
		this.size = size;
	}
}
