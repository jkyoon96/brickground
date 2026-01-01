package com.sopoong.brickground.webapp.domain.creation;


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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;

import com.sopoong.brickground.webapp.domain.User;

import lombok.*;

@Entity
@Table(name = "CREATIONBLACKLIST")
@TableGenerator(name = "CREATIONBLACKLIST_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "CREATIONBLACKLIST_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class CreationBlacklist {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "CREATIONBLACKLIST_SEQ_GENERATOR")
	private Long creationBlacklistId;

	private Long creationId;
	private String creationName;
	private Long reporterId;
	private String reporterName;
	private Long userId;
	private int blacklistType;
	private int blacklistState;
	private String description;
	private LocalDateTime createDate;
	
	
	
	@Builder
	public CreationBlacklist(Long creationBlacklistId, Long creationId, String creationName,
			Long reporterId, String reporterName, Long userId, int blacklistType, int blacklistState,
			String description, LocalDateTime createDate) {
		
		this.creationBlacklistId = creationBlacklistId;
		this.creationId = creationId;
		this.creationName = creationName;
		this.reporterId = reporterId;
		this.reporterName = reporterName;
		this.userId = userId;
		this.blacklistType = blacklistType;
		this.blacklistState = blacklistState;
		this.description = description;
		this.createDate = createDate;
	}
	
	public CreationBlacklist() {
		
	}
}
