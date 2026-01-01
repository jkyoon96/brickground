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
@Table(name = "QNAS")
@TableGenerator(name = "QNAS_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "QNAS_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Qna {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "QNAS_SEQ_GENERATOR")
	private Long qnaId;
	
	@NonNull
	private Long userId;
	
	@NonNull
	private Long shopId;
	
	private String qnaType;
	
	private String qnaTitle;
	
	private String qnaQuestion;
	
	private String qnaAnswer;
	
	private String qnaState;
	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public Qna(Long qnaId, @NonNull Long userId, @NonNull Long shopId, String qnaType,
			String qnaTitle, String qnaQuestion, String qnaAnswer, String qnaState, LocalDateTime createDate,	LocalDateTime updateDate) {
		this.qnaId = qnaId;
		this.userId = userId;
		this.shopId = shopId;
		this.qnaType = qnaType;
		this.qnaTitle = qnaTitle;
		this.qnaQuestion = qnaQuestion;
		this.qnaState = qnaState;     	// W: Waiting (대기중), C: Completed (답변완료) , D: Delete (삭제)
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public Qna() {
		
	}
}
