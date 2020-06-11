package com.school.web.rest;

import com.school.SchoolApp;
import com.school.domain.Continent;
import com.school.repository.ContinentRepository;

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
 * Integration tests for the {@link ContinentResource} REST controller.
 */
@SpringBootTest(classes = SchoolApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContinentResourceIT {

    private static final String DEFAULT_NOM_CONTINENT = "AAAAAAAAAA";
    private static final String UPDATED_NOM_CONTINENT = "BBBBBBBBBB";

    private static final Double DEFAULT_SUPERFICIE = 1D;
    private static final Double UPDATED_SUPERFICIE = 2D;

    @Autowired
    private ContinentRepository continentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContinentMockMvc;

    private Continent continent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Continent createEntity(EntityManager em) {
        Continent continent = new Continent()
            .nomContinent(DEFAULT_NOM_CONTINENT)
            .superficie(DEFAULT_SUPERFICIE);
        return continent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Continent createUpdatedEntity(EntityManager em) {
        Continent continent = new Continent()
            .nomContinent(UPDATED_NOM_CONTINENT)
            .superficie(UPDATED_SUPERFICIE);
        return continent;
    }

    @BeforeEach
    public void initTest() {
        continent = createEntity(em);
    }

    @Test
    @Transactional
    public void createContinent() throws Exception {
        int databaseSizeBeforeCreate = continentRepository.findAll().size();
        // Create the Continent
        restContinentMockMvc.perform(post("/api/continents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(continent)))
            .andExpect(status().isCreated());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeCreate + 1);
        Continent testContinent = continentList.get(continentList.size() - 1);
        assertThat(testContinent.getNomContinent()).isEqualTo(DEFAULT_NOM_CONTINENT);
        assertThat(testContinent.getSuperficie()).isEqualTo(DEFAULT_SUPERFICIE);
    }

    @Test
    @Transactional
    public void createContinentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = continentRepository.findAll().size();

        // Create the Continent with an existing ID
        continent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContinentMockMvc.perform(post("/api/continents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(continent)))
            .andExpect(status().isBadRequest());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContinents() throws Exception {
        // Initialize the database
        continentRepository.saveAndFlush(continent);

        // Get all the continentList
        restContinentMockMvc.perform(get("/api/continents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(continent.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomContinent").value(hasItem(DEFAULT_NOM_CONTINENT)))
            .andExpect(jsonPath("$.[*].superficie").value(hasItem(DEFAULT_SUPERFICIE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getContinent() throws Exception {
        // Initialize the database
        continentRepository.saveAndFlush(continent);

        // Get the continent
        restContinentMockMvc.perform(get("/api/continents/{id}", continent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(continent.getId().intValue()))
            .andExpect(jsonPath("$.nomContinent").value(DEFAULT_NOM_CONTINENT))
            .andExpect(jsonPath("$.superficie").value(DEFAULT_SUPERFICIE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingContinent() throws Exception {
        // Get the continent
        restContinentMockMvc.perform(get("/api/continents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContinent() throws Exception {
        // Initialize the database
        continentRepository.saveAndFlush(continent);

        int databaseSizeBeforeUpdate = continentRepository.findAll().size();

        // Update the continent
        Continent updatedContinent = continentRepository.findById(continent.getId()).get();
        // Disconnect from session so that the updates on updatedContinent are not directly saved in db
        em.detach(updatedContinent);
        updatedContinent
            .nomContinent(UPDATED_NOM_CONTINENT)
            .superficie(UPDATED_SUPERFICIE);

        restContinentMockMvc.perform(put("/api/continents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContinent)))
            .andExpect(status().isOk());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeUpdate);
        Continent testContinent = continentList.get(continentList.size() - 1);
        assertThat(testContinent.getNomContinent()).isEqualTo(UPDATED_NOM_CONTINENT);
        assertThat(testContinent.getSuperficie()).isEqualTo(UPDATED_SUPERFICIE);
    }

    @Test
    @Transactional
    public void updateNonExistingContinent() throws Exception {
        int databaseSizeBeforeUpdate = continentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContinentMockMvc.perform(put("/api/continents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(continent)))
            .andExpect(status().isBadRequest());

        // Validate the Continent in the database
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContinent() throws Exception {
        // Initialize the database
        continentRepository.saveAndFlush(continent);

        int databaseSizeBeforeDelete = continentRepository.findAll().size();

        // Delete the continent
        restContinentMockMvc.perform(delete("/api/continents/{id}", continent.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Continent> continentList = continentRepository.findAll();
        assertThat(continentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
