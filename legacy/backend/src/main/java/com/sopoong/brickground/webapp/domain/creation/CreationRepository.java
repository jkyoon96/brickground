package com.sopoong.brickground.webapp.domain.creation;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CreationRepository extends CrudRepository<Creation, Long> {
	
	List<Creation> findAllByShopId(Long shopId, Pageable pageable);
	
	@Query("select u from Creation u where u.shopId = ?1 and u.creationName like concat('%', ?2, '%') ")
	List<Creation> findAllBySearch(Long shopId, String keyword);
	
	@Query("select u from Creation u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 ")
	List<Creation> findAllByCategory(Long shopId, Long[] categoryList, Pageable pageable);
	
	@Query("select count(u.creationId) from Creation u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 ")
	long countByCategory(Long shopId, Long[] categoryList);
	
	@Query("select u from Creation u where u.visible=1 and u.shopId = ?1 and u.setNames in ?2 and u.categoryId in ?3 ")
	List<Creation> findAllByProductAndCategory(Long shopId, String[] productList, Long[] categoryList, Pageable pageable);
	
	@Query("select count(u.creationId) from Creation u where u.visible=1 and u.shopId = ?1 and u.setNames in ?2 and u.categoryId in ?3 ")
	long countByProductAndCategory(Long shopId, String[] productList, Long[] categoryList);
	
	@Query("select u from Creation u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 and u.subjectId in ?3 and u.sizeId in ?4 ")
	List<Creation> findAllBySubjectAndSize(Long shopId, Long[] categoryList, Integer[] subjectList, Integer[] sizeIdList, Pageable paramPageable);
	  
	@Query("select count(u.creationId) from Creation u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 and u.subjectId in ?3 and u.sizeId in ?4  ")
	long countBySubjectAndSize(Long shopId, Long[] categoryList, Integer[] subjectList, Integer[] sizeIdList);
	
	@Query("select u from Creation u where u.visible=1 and u.rootId = ?1 ")
	List<Creation> findAllRemix(Long rootId, Pageable pageable);
	
	
	List<Creation> findAllByUserId(Long userId, Pageable pageable);
	
	long countByUserId(Long shopId);
}
