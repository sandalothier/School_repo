package com.school.web.rest;

import com.school.SchoolApp;
import com.school.domain.RegroupementRegional;
import com.school.repository.RegroupementRegionalRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RegroupementRegionalResource} REST controller.
 */
@SpringBootTest(classes = SchoolApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RegroupementRegionalResourceIT {

    private static final String DEFAULT_SIGLE = "AAAAAAAAAA";
    private static final String UPDATED_SIGLE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_REGROUPEMENT = "AAAAAAAAAA";
    private static final String UPDATED_NOM_REGROUPEMENT = "BBBBBBBBBB";

    @Autowired
    private RegroupementRegionalRepository regroupementRegionalRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRegroupementRegionalMockMvc;

    private RegroupementRegional regroupementRegional;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RegroupementRegional createEntity(EntityManager em) {
        RegroupementRegional regroupementRegional = new RegroupementRegional()
            .sigle(DEFAULT_SIGLE)
            .nomRegroupement(DEFAULT_NOM_REGROUPEMENT);
        return regroupementRegional;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RegroupementRegional createUpdatedEntity(EntityManager em) {
        RegroupementRegional regroupementRegional = new RegroupementRegional()
            .sigle(UPDATED_SIGLE)
            .nomRegroupement(UPDATED_NOM_REGROUPEMENT);
        return regroupementRegional;
    }

    @BeforeEach
    public void initTest() {
        regroupementRegional = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegroupementRegional() throws Exception {
        int databaseSizeBeforeCreate = regroupementRegionalRepository.findAll().size();
        // Create the RegroupementRegional
        restRegroupementRegionalMockMvc.perform(post("/api/regroupement-regionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regroupementRegional)))
            .andExpect(status().isCreated());

        // Validate the RegroupementRegional in the database
        List<RegroupementRegional> regroupementRegionalList = regroupementRegionalRepository.findAll();
        assertThat(regroupementRegionalList).hasSize(databaseSizeBeforeCreate + 1);
        RegroupementRegional testRegroupementRegional = regroupementRegionalList.get(regroupementRegionalList.size() - 1);
        assertThat(testRegroupementRegional.getSigle()).isEqualTo(DEFAULT_SIGLE);
        assertThat(testRegroupementRegional.getNomRegroupement()).isEqualTo(DEFAULT_NOM_REGROUPEMENT);
    }

    @Test
    @Transactional
    public void createRegroupementRegionalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = regroupementRegionalRepository.findAll().size();

        // Create the RegroupementRegional with an existing ID
        regroupementRegional.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegroupementRegionalMockMvc.perform(post("/api/regroupement-regionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regroupementRegional)))
            .andExpect(status().isBadRequest());

        // Validate the RegroupementRegional in the database
        List<RegroupementRegional> regroupementRegionalList = regroupementRegionalRepository.findAll();
        assertThat(regroupementRegionalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRegroupementRegionals() throws Exception {
        // Initialize the database
        regroupementRegionalRepository.saveAndFlush(regroupementRegional);

        // Get all the regroupementRegionalList
        restRegroupementRegionalMockMvc.perform(get("/api/regroupement-regionals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(regroupementRegional.getId().intValue())))
            .andExpect(jsonPath("$.[*].sigle").value(hasItem(DEFAULT_SIGLE)))
            .andExpect(jsonPath("$.[*].nomRegroupement").value(hasItem(DEFAULT_NOM_REGROUPEMENT)));
    }
    
    @Test
    @Transactional
    public void getRegroupementRegional() throws Exception {
        // Initialize the database
        regroupementRegionalRepository.saveAndFlush(regroupementRegional);

        // Get the regroupementRegional
        restRegroupementRegionalMockMvc.perform(get("/api/regroupement-regionals/{id}", regroupementRegional.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(regroupementRegional.getId().intValue()))
            .andExpect(jsonPath("$.sigle").value(DEFAULT_SIGLE))
            .andExpect(jsonPath("$.nomRegroupement").value(DEFAULT_NOM_REGROUPEMENT));
    }
    @Test
    @Transactional
    public void getNonExistingRegroupementRegional() throws Exception {
        // Get the regroupementRegional
        restRegroupementRegionalMockMvc.perform(get("/api/regroupement-regionals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegroupementRegional() throws Exception {
        // Initialize the database
        regroupementRegionalRepository.saveAndFlush(regroupementRegional);

        int databaseSizeBeforeUpdate = regroupementRegionalRepository.findAll().size();

        // Update the regroupementRegional
        RegroupementRegional updatedRegroupementRegional = regroupementRegionalRepository.findById(regroupementRegional.getId()).get();
        // Disconnect from session so that the updates on updatedRegroupementRegional are not directly saved in db
        em.detach(updatedRegroupementRegional);
        updatedRegroupementRegional
            .sigle(UPDATED_SIGLE)
            .nomRegroupement(UPDATED_NOM_REGROUPEMENT);

        restRegroupementRegionalMockMvc.perform(put("/api/regroupement-regionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegroupementRegional)))
            .andExpect(status().isOk());

        // Validate the RegroupementRegional in the database
        List<RegroupementRegional> regroupementRegionalList = regroupementRegionalRepository.findAll();
        assertThat(regroupementRegionalList).hasSize(databaseSizeBeforeUpdate);
        RegroupementRegional testRegroupementRegional = regroupementRegionalList.get(regroupementRegionalList.size() - 1);
        assertThat(testRegroupementRegional.getSigle()).isEqualTo(UPDATED_SIGLE);
        assertThat(testRegroupementRegional.getNomRegroupement()).isEqualTo(UPDATED_NOM_REGROUPEMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingRegroupementRegional() throws Exception {
        int databaseSizeBeforeUpdate = regroupementRegionalRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegroupementRegionalMockMvc.perform(put("/api/regroupement-regionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regroupementRegional)))
            .andExpect(status().isBadRequest());

        // Validate the RegroupementRegional in the database
        List<RegroupementRegional> regroupementRegionalList = regroupementRegionalRepository.findAll();
        assertThat(regroupementRegionalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRegroupementRegional() throws Exception {
        // Initialize the database
        regroupementRegionalRepository.saveAndFlush(regroupementRegional);

        int databaseSizeBeforeDelete = regroupementRegionalRepository.findAll().size();

        // Delete the regroupementRegional
        restRegroupementRegionalMockMvc.perform(delete("/api/regroupement-regionals/{id}", regroupementRegional.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RegroupementRegional> regroupementRegionalList = regroupementRegionalRepository.findAll();
        assertThat(regroupementRegionalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
