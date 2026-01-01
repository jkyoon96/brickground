package com.sopoong.brickground.webapp.domain.creation;


import java.time.LocalDateTime;

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
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GenericGenerator;

import com.sopoong.brickground.webapp.domain.User;

import lombok.*;

@Entity
@Table(name = "CREATIONCOMMENTREPLIES")
@TableGenerator(name = "CREATIONCOMMENTREPLY_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "CREATIONCOMMENTREPLY_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class CreationCommentReply {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "CREATIONCOMMENTREPLY_SEQ_GENERATOR")
	private Long creationCommentReplyId;

	private Long creationCommentId;
	private Long userId;
	private String userName;
	private String content;
	private LocalDateTime createDate;
	
	@Builder
	public CreationCommentReply(Long creationCommentReplyId, Long creationCommentId, Long userId, String userName, String content, LocalDateTime createDate) {
		
		this.creationCommentReplyId = creationCommentReplyId;
		this.creationCommentId = creationCommentId;
		this.userId = userId;
		this.userName = userName;
		this.content = content;
		this.createDate = createDate;
	}
	
	public CreationCommentReply() {
		
	}
}
