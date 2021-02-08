package com.hackernews.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Comment {
    private int id;
    private String commentedBy;
    private String postTitle;
    private int postId;
    private String text;
    private long postedTime;
    private int points;
    private int parentId;

    public Comment(int id,
                   String commentedBy,
                   String postTitle,
                   int postId,
                   String text,
                   long postedTime,
                   int points,
                   int parentId) {
        this.id = id;
        this.commentedBy = commentedBy;
        this.postTitle = postTitle;
        this.postId = postId;
        this.text = text;
        this.postedTime = postedTime;
        this.points = points;
        this.parentId = parentId;
    }

    public Comment() {

    }


    @Id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCommentedBy() {
        return commentedBy;
    }

    public void setCommentedBy(String commentedBy) {
        this.commentedBy = commentedBy;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public long getPostedTime() {
        return postedTime;
    }

    public void setPostedTime(long postedTime) {
        this.postedTime = postedTime;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }
}
