package com.sopoong.brickground.webapp.domain.creation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CreationBlacklistRepository extends CrudRepository<CreationBlacklist, Long> {
	
}
