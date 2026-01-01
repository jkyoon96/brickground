package com.sopoong.brickground.webapp.domain.creation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CreationCommentRepository extends CrudRepository<CreationComment, Long> {
	
	List<CreationComment> findAll(Pageable pageable);
	
	
	@Query("select u from CreationComment u where u.creationId = ?1 order by createDate desc ")
	List<CreationComment> findCommentsByCreationId(long creationId);
	
}
