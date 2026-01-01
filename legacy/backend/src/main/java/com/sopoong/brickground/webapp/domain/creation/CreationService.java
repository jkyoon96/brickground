package com.sopoong.brickground.webapp.domain.creation;


import org.json.simple.JSONObject;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Transactional
public class CreationService {

	
	@Autowired
	private CreationRepository creationRepository;
	
	@Autowired
	private CreationCommentRepository creationCommentRepository;
	
	@Autowired
	private CreationCommentReplyRepository creationCommentReplyRepository;
	
	@Autowired
	private CreationLikeRepository creationLikeRepository;
	
	@Autowired
	private CreationBlacklistRepository creationBlacklistRepository;
	


	////////////////////////
	// Creation API
	////////////////////////
	
	public List<Creation> findCreationByShopId(Long shopId, int page, int size) {

		Pageable pageable = PageRequest.of(page, size);
		
		List<Creation> creations = creationRepository.findAllByShopId(shopId, pageable);

    
		return creations;
	}
	
	public List<Creation> findCreatonByCategory(Long shopId, String categoryList, int page, int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("creationId").descending());
		
		String[] categorys = categoryList.split(",");
		
		Long[] categoryl = new Long[categorys.length];
		
		for(int index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		List<Creation> creations = creationRepository.findAllByCategory(shopId, categoryl, pageable);

    
		return creations;
	}
	
	
	public List<Creation> findRemixCreation(Long rootId, int page, int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("creationId").descending());
		
		List<Creation> creations = creationRepository.findAllRemix(rootId, pageable);

    
		return creations;
	}
	
	
	
	public List<Creation> findCreationBySearch(Long shopId, String keyword, int page, int size) {
		
		
		List<Creation> creations = creationRepository.findAllBySearch(shopId, keyword);
    
    
		return creations;
	}
  
  
	public Creation createCreation(Creation request) {
	  
		Creation creation = Creation.builder()
							.shopId(request.getShopId())
							.creationName(request.getCreationName())
							.categoryId(request.getCategoryId())
							.visible(request.getVisible())
							.coverImage(request.getCoverImage())
							.videoData(request.getVideoData())
							.setNames(request.getSetNames())
							.viewCount(0)
							.likeCount(0)
							.shareCount(0)
							.cloneCount(0)
							.commentCount(0)
							.rootId(request.getRootId())
							.parentId(request.getParentId())
							.userId(request.getUserId())
							.userName(request.getUserName())
							.blacklistMode(request.getBlacklistMode())
							.subjectId(request.getSubjectId())
							.sizeId(request.getSizeId())
							.sizeName(request.getSizeName())
							.description(request.getDescription())
							.createDate(LocalDateTime.now())
							.build();
	  
		creationRepository.save(creation);
	  
		return creation;
	}
	
	
	public Creation updateCreation(Creation request) {
		  
		Creation creation = null;
		
		Optional<Creation> creationOp = creationRepository.findById(request.getCreationId());
		
		if(creationOp.isPresent()) {
			
			creation = creationOp.get();
			creation.setShopId(request.getShopId());
			creation.setCreationName(request.getCreationName());
			creation.setCategoryId(request.getCategoryId());
			creation.setVisible(request.getVisible());		
			creation.setCoverImage(request.getCoverImage());
			creation.setVideoData(request.getVideoData());
			creation.setSetNames(request.getSetNames());
			creation.setSubjectId(request.getSubjectId());
			creation.setSizeId(request.getSizeId());
			creation.setSizeName(request.getSizeName());
			creation.setDescription(request.getDescription());
			creation.setUpdateDate(LocalDateTime.now());
			
			creationRepository.save(creation);
		}	
		
		return creation;
	}
	
	public Creation copyCreation(Creation request) {
		  
		Creation creation = null;
		
		Optional<Creation> creationOp = creationRepository.findById(request.getCreationId());
		
		if(creationOp.isPresent()) {
			
			Creation creationOrg = creationOp.get();
			String creationName = creationOrg.getCreationName() + "_복사";
			
			long rootId = request.getCreationId();
			
			if(creationOrg.getRootId() != 0)
				rootId = creationOrg.getRootId();
			
			creation = Creation.builder()
					.shopId(creationOrg.getShopId())
					.creationName(creationName)
					.categoryId(creationOrg.getCategoryId())
					.visible(creationOrg.getVisible())
					.coverImage(creationOrg.getCoverImage())
					.videoData(creationOrg.getVideoData())
					.setNames(creationOrg.getSetNames())
					.description(creationOrg.getDescription())
					.vrModels(creationOrg.getVrModels())
					.viewCount(0)
					.likeCount(0)
					.shareCount(0)
					.cloneCount(0)
					.commentCount(0)
					.rootId(rootId)
					.parentId(request.getCreationId())
					.userId(request.getUserId())
					.userName(request.getUserName())
					.blacklistMode(request.getBlacklistMode())
					.subjectId(request.getSubjectId())
					.sizeId(request.getSizeId())
					.sizeName(request.getSizeName())
					.createDate(LocalDateTime.now())
					.build();

			creationRepository.save(creation);
			
			// 리믹스 횟수 추가
			
			Optional<Creation> rootCreationOp = creationRepository.findById(rootId);
			if(rootCreationOp.isPresent()) {
				
				Creation rootCreation= rootCreationOp.get();
			
				rootCreation.setCloneCount(rootCreation.getCloneCount() + 1);
				creationRepository.save(rootCreation);
			}
			
			if(creationOrg.getCreationId() !=  rootId) {
				
				creationOrg.setCloneCount(creationOrg.getCloneCount() + 1);
				creationRepository.save(creationOrg);
			}

		}	
		
		return creation;
	}
	
	
	public Creation deleteCreation(Creation request) {
		  
		creationRepository.deleteById(request.getCreationId());
		
		return request;
	}
	
	
	public Creation updateCreationAsset(Long creationId, String vrModels) {
		  
		Optional<Creation> creation = creationRepository.findById(creationId);
		
		Creation newCreation = null;
		
		if(creation.isPresent()) {
			
			newCreation = creation.get();
			newCreation.setVrModels(vrModels);
			
			creationRepository.save(newCreation);
		}	
	  
		return newCreation;
	}
	
	public Creation updateCreationLike(CreationLike request) {
		  
		Optional<Creation> creation = creationRepository.findById(request.getCreationId());
		
		Creation newCreation = null;
		
		if(creation.isPresent()) {
			
			newCreation = creation.get();
			
			int likeType = request.getLikeType();
			
			if(likeType == 0)
				newCreation.setLikeCount(newCreation.getLikeCount() - 1);
			else if(likeType == 1)
				newCreation.setLikeCount(newCreation.getLikeCount() + 1);
			
			creationRepository.save(newCreation);
			
			createCreationLike(request);
		}	
	  
		return newCreation;
	}
	
	public Creation updateCreationBlacklist(CreationBlacklist request) {
		  
		Optional<Creation> creation = creationRepository.findById(request.getCreationId());
		
		Creation newCreation = null;
		
		if(creation.isPresent()) {
			
			newCreation = creation.get();
			newCreation.setBlacklistMode(request.getBlacklistState());
			
			creationRepository.save(newCreation);
			
		}	
	  
		return newCreation;
	}
	
  
	public Optional<Creation> findCreationById(Long creationId, Boolean view) {
		
		if(!view)
			return creationRepository.findById(creationId);
		
		Optional<Creation> creation = creationRepository.findById(creationId);
		
		if(creation.isPresent()) {
			
			Creation newCreation = creation.get();
			newCreation.setViewCount(newCreation.getViewCount() + 1);
			
			creationRepository.save(newCreation);
		}	

		
		return creationRepository.findById(creationId);
	}
	
	
	public long countCreationByCategory(Long shopId, String categoryList) {
		
		String[] categorys = categoryList.split(",");
		
		Long[] categoryl = new Long[categorys.length];
		
		for(int index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		return creationRepository.countByCategory(shopId, categoryl);

	}
	
	
	public List<Creation> findCreationByProductAndCategory(Long shopId, String productList, String categoryList, int page, int size, int sortType) {

		Pageable pageable = null;
		
		if(sortType == 1)   // 최신 순
			pageable = PageRequest.of(page, size, Sort.by("creationId").descending());
		else if(sortType == 2)  // 조회 순
			pageable = PageRequest.of(page, size, Sort.by("viewCount").descending());
		else if(sortType == 3)  // 추천 순
			pageable = PageRequest.of(page, size, Sort.by("likeCount").descending());
		else if(sortType == 4)  // 댓글/답글 순
			pageable = PageRequest.of(page, size, Sort.by("commentCount").descending());
		else if(sortType == 5)  // 리믹스 순
			pageable = PageRequest.of(page, size, Sort.by("cloneCount").descending());
		
		
		
		String[] products = productList.split(",");
		String[] categorys = categoryList.split(",");
		
		ArrayList<String> productl = new ArrayList<String>();
		
		int index = 0;
		
		for(index= 0; index < products.length; index++) {
						
			if(products[index].compareTo("45678") == 0) {
				productl.add("45678");
				productl.add("45678,45680");
			}
			else if(products[index].compareTo("51515") == 0) {
				productl.add("51515");
				productl.add("51515,99998");
			}
			else if(products[index].compareTo("45544") == 0) {
				productl.add("45544");
				productl.add("45544,45560");
				productl.add("31313");
			}
			else {
				productl.add(products[index]);
			}
		}
		
		Long[] categoryl = new Long[categorys.length];
		
		for(index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		List<Creation> creations = creationRepository.findAllByProductAndCategory(shopId, productl.toArray(new String[productl.size()]), categoryl, pageable);

    
		return creations;
	}
	
	
	public long countCreationByProductAndCategory(Long shopId, String productList,  String categoryList) {
		
		String[] products = productList.split(",");
		String[] categorys = categoryList.split(",");
		
		ArrayList<String> productl = new ArrayList<String>();
		
		int index = 0;
		
		for(index= 0; index < products.length; index++) {
			
			if(products[index].compareTo("45678") == 0) {
				productl.add("45678");
				productl.add("45678,45680");
			}
			else if(products[index].compareTo("51515") == 0) {
				productl.add("51515");
				productl.add("51515,99998");
			}
			else if(products[index].compareTo("45544") == 0) {
				productl.add("45544");
				productl.add("45544,45560");
				productl.add("31313");
			}
			else {
				productl.add(products[index]);
			}

		}
		
		
		
		Long[] categoryl = new Long[categorys.length];
		
		for(index= 0; index < categorys.length; index++) {
			
			categoryl[index] = Long.parseLong(categorys[index]);		
		}
		
		
		return creationRepository.countByProductAndCategory(shopId, productl.toArray(new String[productl.size()]), categoryl);

	}
	
	
	public List<Creation> findCreationBySubjectAndSize(Long shopId, String categoryList, String subjectList, String sizeList, int page, int size, int sortType) {

		Pageable pageable = null;
		
		if (sortType == 1) {
			pageable = PageRequest.of(page, size, Sort.by(new String[] { "creationId" }).descending());
		} else if (sortType == 2) {
			pageable = PageRequest.of(page, size, Sort.by(new String[] { "viewCount" }).descending());
		} else if (sortType == 3) {
			pageable = PageRequest.of(page, size, Sort.by(new String[] { "likeCount" }).descending());
		} else if (sortType == 4) {
			pageable = PageRequest.of(page, size, Sort.by(new String[] { "commentCount" }).descending());
		} else if (sortType == 5) {
			pageable = PageRequest.of(page, size, Sort.by(new String[] { "cloneCount" }).descending());
		} 
		String[] categorys = categoryList.split(",");
		String[] subjects = subjectList.split(",");
		String[] sizes = sizeList.split(",");
		int index = 0;
		Long[] categoryl = new Long[categorys.length];
		for (index = 0; index < categorys.length; index++)
			categoryl[index] = Long.valueOf(Long.parseLong(categorys[index])); 
		
		Integer[] subjecti = new Integer[subjects.length];
		for (index = 0; index < subjects.length; index++)
			subjecti[index] = Integer.valueOf(Integer.parseInt(subjects[index])); 
		
		Integer[] sizei = new Integer[sizes.length];
		for (index = 0; index < sizes.length; index++)
			sizei[index] = Integer.valueOf(Integer.parseInt(sizes[index])); 
		
		List<Creation> creations = creationRepository.findAllBySubjectAndSize(shopId, categoryl, subjecti, sizei, pageable);
		return creations;
	}
	  
	
	public long countCreationBySubjectAndSize(Long shopId, String categoryList, String subjectList, String sizeList) {
		
	    String[] categorys = categoryList.split(",");
	    String[] subjects = subjectList.split(",");
	    String[] sizes = sizeList.split(",");
	    
	    int index = 0;
	    Long[] categoryl = new Long[categorys.length];
	    for (index = 0; index < categorys.length; index++)
	      categoryl[index] = Long.valueOf(Long.parseLong(categorys[index])); 
	    
	    Integer[] subjecti = new Integer[subjects.length];
	    for (index = 0; index < subjects.length; index++)
	      subjecti[index] = Integer.valueOf(Integer.parseInt(subjects[index])); 
	    
	    Integer[] sizei = new Integer[sizes.length];
	    for (index = 0; index < sizes.length; index++)
	      sizei[index] = Integer.valueOf(Integer.parseInt(sizes[index])); 
	    
	    return creationRepository.countBySubjectAndSize(shopId, categoryl, subjecti, sizei);
	}
	  
	  
	  
	public List<Creation> findCreationByUserId(Long userId, int page, int size) {

		Pageable pageable = PageRequest.of(page, size);
	
		List<Creation> creations = creationRepository.findAllByUserId(userId, pageable);

		return creations;
	}
	
	
	public long countCreationByUserId(Long userId) {

		return creationRepository.countByUserId(userId);

	}
	
	

	////////////////////////
	// Creation Comment API
	////////////////////////
	
	public List<CreationComment> findCommentByCreationId(Long creationId) {

		return creationCommentRepository.findCommentsByCreationId(creationId);
	}
	
	
	public CreationComment createCreatComment(CreationComment request) {
		  
		CreationComment creationComment = CreationComment.builder()
						.creationId(request.getCreationId())
						.userId(request.getUserId())
						.userName(request.getUserName())
						.content(request.getContent())
						.createDate(LocalDateTime.now())
						.build();
	  
		
		creationCommentRepository.save(creationComment);
		
		Optional<Creation> creationOp = creationRepository.findById(request.getCreationId());
		if(creationOp.isPresent()) {
			
			Creation creation = creationOp.get();
			creation.setCommentCount(creation.getCommentCount() + 1);
			
			creationRepository.save(creation);
		}	
		
	  
		return creationComment;
	}
	
	
	public CreationComment updateCreationComment(CreationComment request) {
		  
		Optional<CreationComment> creationCommentOp = creationCommentRepository.findById(request.getCreationId());
		
		CreationComment creationComment = null;
		
		if(creationCommentOp.isPresent()) {
			
			creationComment = creationCommentOp.get();
			creationComment.setContent(request.getContent());
			
			creationCommentRepository.save(creationComment);
		}	
	  
		return creationComment;
	}
	
	
	 
	////////////////////////////
	// Creation Comment Reply API
	////////////////////////////
	
	public CreationCommentReply createCreationCommentReply(CreationCommentReply request) {
		  
		CreationCommentReply creationCommentReply = CreationCommentReply.builder()
						.creationCommentId(request.getCreationCommentId())
						.userId(request.getUserId())
						.userName(request.getUserName())
						.content(request.getContent())
						.createDate(LocalDateTime.now())
						.build();
	  
		creationCommentReplyRepository.save(creationCommentReply);
		
		Optional<CreationComment> creationCommentOp = creationCommentRepository.findById(request.getCreationCommentId());
		
		if(creationCommentOp.isPresent()) {
			
			CreationComment creationComment = creationCommentOp.get();
			
			Optional<Creation> creationOp = creationRepository.findById(creationComment.getCreationId());
			if(creationOp.isPresent()) {
				
				Creation creation = creationOp.get();
				creation.setCommentCount(creation.getCommentCount() + 1);
				
				creationRepository.save(creation);
			}	
		}

		return creationCommentReply;
	}
	
	
	public CreationCommentReply updateCreationCommentReply(CreationCommentReply request) {
		  
		Optional<CreationCommentReply> creationCommentReplyOp = creationCommentReplyRepository.findById(request.getCreationCommentReplyId());
		
		CreationCommentReply creationCommentReply = null;
		
		if(creationCommentReplyOp.isPresent()) {
			
			creationCommentReply = creationCommentReplyOp.get();
			creationCommentReply.setContent(request.getContent());
			
			creationCommentReplyRepository.save(creationCommentReply);
		}	
	  
		return creationCommentReply;
	}
	
	 
	////////////////////////////
	// Creation Like API
	////////////////////////////
	
	public CreationLike createCreationLike(CreationLike request) {
		  
		CreationLike creationLike = creationLikeRepository.findCreationLike(request.getCreationId(), request.getUserId());
		
		if(creationLike == null) {
			creationLike = CreationLike.builder()
						.creationId(request.getCreationId())
						.userId(request.getUserId())
						.likeType(request.getLikeType())
						.createDate(LocalDateTime.now())
						.build();
		} else {
			creationLike.setLikeType(request.getLikeType());
		}
	  
		creationLikeRepository.save(creationLike);
	  
		return creationLike;
	}
	
	public CreationLike findCommentLike(CreationLike request) {
		  
		CreationLike creationLike = creationLikeRepository.findCreationLike(request.getCreationId(), request.getUserId());
	   
		return creationLike;
	}
	
	 
	////////////////////////////
	// Creation Blacklist API
	////////////////////////////
	
	public CreationBlacklist createCreationBlacklist(CreationBlacklist request) {
		  
		CreationBlacklist creationBlacklist = CreationBlacklist.builder()
						.creationId(request.getCreationId())
						.creationName(request.getCreationName())
						.reporterId(request.getReporterId())
						.reporterName(request.getReporterName())
						.userId(request.getUserId())
						.blacklistType(request.getBlacklistType())
						.blacklistState(request.getBlacklistState())
						.description(request.getDescription())
						.createDate(LocalDateTime.now())
						.build();
	  
		creationBlacklistRepository.save(creationBlacklist);
	  
		return creationBlacklist;
	}
		
		 
}
