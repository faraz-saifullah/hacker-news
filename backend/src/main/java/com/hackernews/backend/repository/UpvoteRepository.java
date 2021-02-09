package com.hackernews.backend.repository;

import com.hackernews.backend.model.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface UpvoteRepository extends JpaRepository<Upvote, Integer> {
    List<Upvote> getUpvoteByUsername(String username);
    List<Upvote> getUpvotesByPostId(Integer postId);
    @Transactional
    Integer deleteUpvoteByUsernameEqualsAndPostIdEquals(String username, Integer postId);
}
