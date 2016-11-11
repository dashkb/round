package org.girsbrain.ccamp.round.Data;

import org.greenrobot.greendao.annotation.Entity;
import org.greenrobot.greendao.annotation.Id;
import org.greenrobot.greendao.annotation.NotNull;
import org.greenrobot.greendao.annotation.Property;
import org.greenrobot.greendao.annotation.Generated;

@Entity(nameInDb = "tracks")
public class Track
        implements HasId<Long> {
    @Id
    @Property(nameInDb = "id")
    private Long id;

    @NotNull
    @Property(nameInDb = "title")
    private String title;


    @Generated(hash = 1993647710)
    public Track(Long id, @NotNull String title) {
        this.id = id;
        this.title = title;
    }


    @Generated(hash = 1672506944)
    public Track() {
    }


    public Long getId() {
        return this.id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return this.title;
    }


    public void setTitle(String title) {
        this.title = title;
    }
}
