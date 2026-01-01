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
@Table(name = "FAQS")
@TableGenerator(name = "FAQS_SEQ_GENERATOR",
		table = "APPSEQUENCES",
		pkColumnValue = "FAQS_SEQ",
		allocationSize = 1)
@Access(AccessType.FIELD)

@Getter
@Setter
public class Faq {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "FAQS_SEQ_GENERATOR")
	private Long faqId;
	
	@NonNull
	private Long userId;
	
	@NonNull
	private Long shopId;
	
	private String faqType;
	
	private String faqTitle;
	
	private String faqDescription;
	
	@NonNull
	private LocalDateTime createDate;
	
	private LocalDateTime updateDate;
	
	@Builder
	public Faq(Long faqId, @NonNull Long userId, @NonNull Long shopId, String faqType,
			String faqTitle, String faqDescription, LocalDateTime createDate,	LocalDateTime updateDate) {
		this.faqId = faqId;
		this.userId = userId;
		this.shopId = shopId;
		this.faqType = faqType;
		this.faqTitle = faqTitle;
		this.faqDescription = faqDescription;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
	
	public Faq() {
		
	}
}
