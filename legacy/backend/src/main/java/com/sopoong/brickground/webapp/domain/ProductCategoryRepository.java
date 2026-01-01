package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ProductCategoryRepository extends CrudRepository<ProductCategory, Long> {
	
	
	@Query("select u.productId from ProductCategory u where u.categoryOne = ?1 ")
	List<Long> findProuctIdByCategory(Integer categoryOne);
	
	@Query("select u.productId from ProductCategory u where u.categoryOne = ?1 and u.categoryTwo = ?2 ")
	List<Long> findProuctIdByCategory(Integer categoryOne, Integer categoryTwo);
	
	@Query("select u.productId from ProductCategory u where u.categoryOne = ?1 and u.categoryTwo = ?2 and u.categoryThree = ?3 ")
	List<Long> findProuctIdByCategory(Integer categoryOne, Integer categoryTwo, Integer categoryThree);
	
}
