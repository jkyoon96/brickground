package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface VrMallRepository extends CrudRepository<VrMall, Long> {
	
	List<VrMall> findAllByShopId(Long shopId, Pageable pageable);
	
	@Query("select u from VrMall u where u.shopId = ?1 and u.vrMallName like concat('%', ?2, '%') ")
	List<VrMall> findAllBySearch(Long shopId, String keyword);
	
	@Query("select u from VrMall u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 ")
	List<VrMall> findAllByCategory(Long shopId, Long[] categoryList, Pageable pageable);
	
	@Query("select count(u.vrMallId) from VrMall u where u.visible=1 and u.shopId = ?1 and u.categoryId in ?2 ")
	long countByCategory(Long shopId, Long[] categoryList);
	
	@Query("select u from VrMall u where u.visible=1 and u.shopId = ?1 and u.setNames in ?2 and u.categoryId in ?3 ")
	List<VrMall> findAllByProductAndCategory(Long shopId, String[] productList, Long[] categoryList, Pageable pageable);
	
	@Query("select count(u.vrMallId) from VrMall u where u.visible=1 and u.shopId = ?1 and u.setNames in ?2 and u.categoryId in ?3 ")
	long countByProductAndCategory(Long shopId, String[] productList, Long[] categoryList);
}
