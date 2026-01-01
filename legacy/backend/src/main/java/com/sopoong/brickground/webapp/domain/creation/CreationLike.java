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
@Table(name = "CREATIONLIKES")
@TableGenerator(name = "CREATIONLIKE_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "CREATIONLIKE_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class CreationLike {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "CREATIONLIKE_SEQ_GENERATOR")
	private Long creationLikeId;

	private Long creationId;
	private Long userId;
	private int likeType;
	private LocalDateTime createDate;
	
	
	
	@Builder
	public CreationLike(Long creationLikeId, Long creationId, 
			Long userId, int likeType, LocalDateTime createDate) {
		
		this.creationLikeId = creationLikeId;
		this.creationId = creationId;
		this.userId = userId;
		this.likeType = likeType;
		this.createDate = createDate;
	}
	
	public CreationLike() {
		
	}
}
