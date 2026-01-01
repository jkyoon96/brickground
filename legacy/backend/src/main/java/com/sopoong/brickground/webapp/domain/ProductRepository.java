package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
	
	@Query("select u from Product u where u.visible=1 and u.shopId = ?1 ")
	List<Product> findAllByShopId(Long shopId, Pageable pageable);
	
	@Query("select u from Product u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2  ")
	List<Product> findAllByCategory(Long shopId, Long[] categoryList, Pageable pageable);
	

	@Query("select u from Product u where u.visible=1 and u.shopId = ?1 and u.productName like concat('%', ?2, '%') ")
	List<Product> findAllBySearch(Long shopId, String keyword);
	
	@Query("select count(u.productId) from Product u where u.visible=1 and u.shopId = ?1")
	long countByShopId(Long shopId);
	
	
	@Query("select u from Product u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 and u.productSetName in ?3 and u.levelId in ?4 ")
	List<Product> findAllByCategoryAndProductSetAndLevel(Long shopId, Long[] categoryList, String[] productSetList, Integer[] levelList, Pageable pageable);
	
	@Query("select count(u.productId) from Product u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 and u.productSetName in ?3 and u.levelId in ?4")
	long countByCategoryAndProductSetAndLevel(Long shopId, Long[] categoryList, String[] productSetList, Integer[] levelList );
	
	@Query("select u from Product u where u.visible=1 and u.categoryId in ?1 and u.subjectId in ?2 ")
	List<Product> findAllByCategoryAndSubject(Long[] categoryList, Integer[] subjectList, Pageable pageable);
	
	@Query("select count(u.productId) from Product u where u.visible=1 and u.categoryId in ?1 and u.subjectId in ?2")
	long countByCategoryAndSubject(Long[] categoryList, Integer[] subjectList );
	
}
