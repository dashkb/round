package org.girsbrain.ccamp.round.Data;

import org.greenrobot.greendao.annotation.*;

@Entity(nameInDb = "genres")
public class Genre
        implements HasId<Long> {
    @Id
    @Property(nameInDb = "id")
    private Long id;
    
    @NotNull
    @Property(nameInDb = "name")
    private String name;

    @Generated(hash = 1948587236)
    public Genre(Long id, @NotNull String name) {
        this.id = id;
        this.name = name;
    }

    @Generated(hash = 235763487)
    public Genre() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}