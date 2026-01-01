package com.sopoong.brickground.webapp.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface VrModelRepository extends CrudRepository<VrModel, Long> {
	
	List<VrModel> findAllByShopId(Long shopId);
	
	List<VrModel> findAllBySetName(String setName);
	
	@Query("select u from VrModel u where u.setName in ?1 order by u.setName, u.sortId")
	List<VrModel> findAllBySetNames(String[] categoryList);
}
