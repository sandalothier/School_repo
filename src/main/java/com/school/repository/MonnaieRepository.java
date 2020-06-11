package com.school.repository;

import com.school.domain.Monnaie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Monnaie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MonnaieRepository extends JpaRepository<Monnaie, Long> {
}
