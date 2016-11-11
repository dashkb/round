package org.girsbrain.ccamp.round.Data;

import org.greenrobot.greendao.annotation.Entity;
import org.greenrobot.greendao.annotation.Id;
import org.greenrobot.greendao.annotation.NotNull;
import org.greenrobot.greendao.annotation.Property;
import org.greenrobot.greendao.annotation.Generated;

@Entity(nameInDb = "artists")
public class Artist
        implements HasId<Long> {
    @Id
    @Property(nameInDb = "id")
    private Long id;

    @NotNull
    @Property(nameInDb = "name")
    private String name;

    @Generated(hash = 184921593)
    public Artist(Long id, @NotNull String name) {
        this.id = id;
        this.name = name;
    }

    @Generated(hash = 19829037)
    public Artist() {
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
