package com.school.web.rest;

import com.school.SchoolApp;
import com.school.domain.Regions;
import com.school.repository.RegionsRepository;

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
 * Integration tests for the {@link RegionsResource} REST controller.
 */
@SpringBootTest(classes = SchoolApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RegionsResourceIT {

    private static final String DEFAULT_NOM_REGION = "AAAAAAAAAA";
    private static final String UPDATED_NOM_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_CHEF_LIEU = "AAAAAAAAAA";
    private static final String UPDATED_CHEF_LIEU = "BBBBBBBBBB";

    @Autowired
    private RegionsRepository regionsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRegionsMockMvc;

    private Regions regions;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Regions createEntity(EntityManager em) {
        Regions regions = new Regions()
            .nomRegion(DEFAULT_NOM_REGION)
            .chefLieu(DEFAULT_CHEF_LIEU);
        return regions;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Regions createUpdatedEntity(EntityManager em) {
        Regions regions = new Regions()
            .nomRegion(UPDATED_NOM_REGION)
            .chefLieu(UPDATED_CHEF_LIEU);
        return regions;
    }

    @BeforeEach
    public void initTest() {
        regions = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegions() throws Exception {
        int databaseSizeBeforeCreate = regionsRepository.findAll().size();
        // Create the Regions
        restRegionsMockMvc.perform(post("/api/regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regions)))
            .andExpect(status().isCreated());

        // Validate the Regions in the database
        List<Regions> regionsList = regionsRepository.findAll();
        assertThat(regionsList).hasSize(databaseSizeBeforeCreate + 1);
        Regions testRegions = regionsList.get(regionsList.size() - 1);
        assertThat(testRegions.getNomRegion()).isEqualTo(DEFAULT_NOM_REGION);
        assertThat(testRegions.getChefLieu()).isEqualTo(DEFAULT_CHEF_LIEU);
    }

    @Test
    @Transactional
    public void createRegionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = regionsRepository.findAll().size();

        // Create the Regions with an existing ID
        regions.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegionsMockMvc.perform(post("/api/regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regions)))
            .andExpect(status().isBadRequest());

        // Validate the Regions in the database
        List<Regions> regionsList = regionsRepository.findAll();
        assertThat(regionsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRegions() throws Exception {
        // Initialize the database
        regionsRepository.saveAndFlush(regions);

        // Get all the regionsList
        restRegionsMockMvc.perform(get("/api/regions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(regions.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomRegion").value(hasItem(DEFAULT_NOM_REGION)))
            .andExpect(jsonPath("$.[*].chefLieu").value(hasItem(DEFAULT_CHEF_LIEU)));
    }
    
    @Test
    @Transactional
    public void getRegions() throws Exception {
        // Initialize the database
        regionsRepository.saveAndFlush(regions);

        // Get the regions
        restRegionsMockMvc.perform(get("/api/regions/{id}", regions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(regions.getId().intValue()))
            .andExpect(jsonPath("$.nomRegion").value(DEFAULT_NOM_REGION))
            .andExpect(jsonPath("$.chefLieu").value(DEFAULT_CHEF_LIEU));
    }
    @Test
    @Transactional
    public void getNonExistingRegions() throws Exception {
        // Get the regions
        restRegionsMockMvc.perform(get("/api/regions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegions() throws Exception {
        // Initialize the database
        regionsRepository.saveAndFlush(regions);

        int databaseSizeBeforeUpdate = regionsRepository.findAll().size();

        // Update the regions
        Regions updatedRegions = regionsRepository.findById(regions.getId()).get();
        // Disconnect from session so that the updates on updatedRegions are not directly saved in db
        em.detach(updatedRegions);
        updatedRegions
            .nomRegion(UPDATED_NOM_REGION)
            .chefLieu(UPDATED_CHEF_LIEU);

        restRegionsMockMvc.perform(put("/api/regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegions)))
            .andExpect(status().isOk());

        // Validate the Regions in the database
        List<Regions> regionsList = regionsRepository.findAll();
        assertThat(regionsList).hasSize(databaseSizeBeforeUpdate);
        Regions testRegions = regionsList.get(regionsList.size() - 1);
        assertThat(testRegions.getNomRegion()).isEqualTo(UPDATED_NOM_REGION);
        assertThat(testRegions.getChefLieu()).isEqualTo(UPDATED_CHEF_LIEU);
    }

    @Test
    @Transactional
    public void updateNonExistingRegions() throws Exception {
        int databaseSizeBeforeUpdate = regionsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegionsMockMvc.perform(put("/api/regions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regions)))
            .andExpect(status().isBadRequest());

        // Validate the Regions in the database
        List<Regions> regionsList = regionsRepository.findAll();
        assertThat(regionsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRegions() throws Exception {
        // Initialize the database
        regionsRepository.saveAndFlush(regions);

        int databaseSizeBeforeDelete = regionsRepository.findAll().size();

        // Delete the regions
        restRegionsMockMvc.perform(delete("/api/regions/{id}", regions.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Regions> regionsList = regionsRepository.findAll();
        assertThat(regionsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
