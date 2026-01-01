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
@Table(name = "CREATIONCOMMENTS")
@TableGenerator(name = "CREATIONCOMMENT_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "CREATIONCOMMENT_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class CreationComment {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "CREATIONCOMMENT_SEQ_GENERATOR")
	private Long creationCommentId;

	private Long creationId;
	private Long userId;
	private String userName;
	private String content;
	private LocalDateTime createDate;
	
	
	@OneToMany
	@JoinColumn(name ="creationCommentId")
	private List<CreationCommentReply> replies;
	
	
	@Builder
	public CreationComment(Long creationCommentId, Long creationId, 
			Long userId, String userName, String content, LocalDateTime createDate) {
		
		this.creationCommentId = creationCommentId;
		this.creationId = creationId;
		this.userId = userId;
		this.userName = userName;
		this.content = content;
		this.createDate = createDate;
	}
	
	public CreationComment() {
		
	}
}
