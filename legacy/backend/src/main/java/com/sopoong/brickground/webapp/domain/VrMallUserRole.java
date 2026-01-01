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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;

import com.sopoong.brickground.webapp.domain.Product;

import lombok.*;

@Entity
@Table(name = "VRMALLUSERROLES")
@TableGenerator(name = "VRMALLUSERROLE_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "VRMALLUSERROLE_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class VrMallUserRole {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "VRMALLUSERROLE_SEQ_GENERATOR")
	private Long vrMallUserRoleId;

	private Long vrMallId;
	private Long userId;
	private Long productId;
	private Long roleId;
	private int	status;
	private LocalDateTime timeStart;
	private LocalDateTime timeEnd;
	private Long modifierId;
	private LocalDateTime timeCreated;
	private LocalDateTime timeModified;
	
	
	@Builder
	public VrMallUserRole(Long vrMallUserRoleId, Long vrMallId, Long userId, Long productId, Long roleId, int	status,
			LocalDateTime timeStart, LocalDateTime timeEnd, Long modifierId, LocalDateTime timeCreated, LocalDateTime timeModified) {
		
		this.vrMallUserRoleId = vrMallUserRoleId;
		this.vrMallId = vrMallId;
		this.userId = userId;
		this.productId = productId;
		this.roleId = roleId;
		this.status = status;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.modifierId = modifierId;
		this.timeCreated = timeCreated;
		this.timeModified = timeModified;
	}
	
	public VrMallUserRole() {
		
	}
}
