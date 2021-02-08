package com.hackernews.backend.repository;

import com.hackernews.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findAllByPostedBy(String username);
}
