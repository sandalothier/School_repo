package com.school.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * Region entity.\n@author sanda\nC'est l'ensemble des composante du territoire\nrelation\n- ManyToOne avec pays\nManyToOne avec Region pour la region superieur
 */
@ApiModel(description = "Region entity.\n@author sanda\nC'est l'ensemble des composante du territoire\nrelation\n- ManyToOne avec pays\nManyToOne avec Region pour la region superieur")
@Entity
@Table(name = "regions")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Regions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_region")
    private String nomRegion;

    @Column(name = "chef_lieu")
    private String chefLieu;

    @ManyToOne
    @JsonIgnoreProperties(value = "regions", allowSetters = true)
    private Pays pays;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomRegion() {
        return nomRegion;
    }

    public Regions nomRegion(String nomRegion) {
        this.nomRegion = nomRegion;
        return this;
    }

    public void setNomRegion(String nomRegion) {
        this.nomRegion = nomRegion;
    }

    public String getChefLieu() {
        return chefLieu;
    }

    public Regions chefLieu(String chefLieu) {
        this.chefLieu = chefLieu;
        return this;
    }

    public void setChefLieu(String chefLieu) {
        this.chefLieu = chefLieu;
    }

    public Pays getPays() {
        return pays;
    }

    public Regions pays(Pays pays) {
        this.pays = pays;
        return this;
    }

    public void setPays(Pays pays) {
        this.pays = pays;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Regions)) {
            return false;
        }
        return id != null && id.equals(((Regions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Regions{" +
            "id=" + getId() +
            ", nomRegion='" + getNomRegion() + "'" +
            ", chefLieu='" + getChefLieu() + "'" +
            "}";
    }
}
