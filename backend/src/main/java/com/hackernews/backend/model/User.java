package com.hackernews.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
    private String password;
    private long timeCreated;
    private String about;
    @Id
    private String username;

    public User(String username,
                String password,
                long timeCreated,
                String about
    ) {
        super();
        this.username = username;
        this.password = password;
        this.timeCreated = timeCreated;
        this.about = about;
    }

    public User() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(long timeCreated) {
        this.timeCreated = timeCreated;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }
}
