package com.sopoong.brickground.webapp.domain.creation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.sopoong.brickground.webapp.domain.User;

public interface CreationLikeRepository extends CrudRepository<CreationLike, Long> {
	
	@Query("select u from CreationLike u where u.creationId = ?1 and u.userId = ?2 ")
	CreationLike findCreationLike(Long creationId, Long userId);
}
