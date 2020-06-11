package com.school.repository;

import com.school.domain.RegroupementRegional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RegroupementRegional entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegroupementRegionalRepository extends JpaRepository<RegroupementRegional, Long> {
}
