package com.school.web.rest;

import com.school.domain.RegroupementRegional;
import com.school.repository.RegroupementRegionalRepository;
import com.school.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.school.domain.RegroupementRegional}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RegroupementRegionalResource {

    private final Logger log = LoggerFactory.getLogger(RegroupementRegionalResource.class);

    private static final String ENTITY_NAME = "regroupementRegional";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RegroupementRegionalRepository regroupementRegionalRepository;

    public RegroupementRegionalResource(RegroupementRegionalRepository regroupementRegionalRepository) {
        this.regroupementRegionalRepository = regroupementRegionalRepository;
    }

    /**
     * {@code POST  /regroupement-regionals} : Create a new regroupementRegional.
     *
     * @param regroupementRegional the regroupementRegional to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new regroupementRegional, or with status {@code 400 (Bad Request)} if the regroupementRegional has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/regroupement-regionals")
    public ResponseEntity<RegroupementRegional> createRegroupementRegional(@RequestBody RegroupementRegional regroupementRegional) throws URISyntaxException {
        log.debug("REST request to save RegroupementRegional : {}", regroupementRegional);
        if (regroupementRegional.getId() != null) {
            throw new BadRequestAlertException("A new regroupementRegional cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RegroupementRegional result = regroupementRegionalRepository.save(regroupementRegional);
        return ResponseEntity.created(new URI("/api/regroupement-regionals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /regroupement-regionals} : Updates an existing regroupementRegional.
     *
     * @param regroupementRegional the regroupementRegional to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regroupementRegional,
     * or with status {@code 400 (Bad Request)} if the regroupementRegional is not valid,
     * or with status {@code 500 (Internal Server Error)} if the regroupementRegional couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/regroupement-regionals")
    public ResponseEntity<RegroupementRegional> updateRegroupementRegional(@RequestBody RegroupementRegional regroupementRegional) throws URISyntaxException {
        log.debug("REST request to update RegroupementRegional : {}", regroupementRegional);
        if (regroupementRegional.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RegroupementRegional result = regroupementRegionalRepository.save(regroupementRegional);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, regroupementRegional.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /regroupement-regionals} : get all the regroupementRegionals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of regroupementRegionals in body.
     */
    @GetMapping("/regroupement-regionals")
    public List<RegroupementRegional> getAllRegroupementRegionals() {
        log.debug("REST request to get all RegroupementRegionals");
        return regroupementRegionalRepository.findAll();
    }

    /**
     * {@code GET  /regroupement-regionals/:id} : get the "id" regroupementRegional.
     *
     * @param id the id of the regroupementRegional to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the regroupementRegional, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/regroupement-regionals/{id}")
    public ResponseEntity<RegroupementRegional> getRegroupementRegional(@PathVariable Long id) {
        log.debug("REST request to get RegroupementRegional : {}", id);
        Optional<RegroupementRegional> regroupementRegional = regroupementRegionalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(regroupementRegional);
    }

    /**
     * {@code DELETE  /regroupement-regionals/:id} : delete the "id" regroupementRegional.
     *
     * @param id the id of the regroupementRegional to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/regroupement-regionals/{id}")
    public ResponseEntity<Void> deleteRegroupementRegional(@PathVariable Long id) {
        log.debug("REST request to delete RegroupementRegional : {}", id);
        regroupementRegionalRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
