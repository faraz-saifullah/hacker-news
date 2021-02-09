package com.hackernews.backend.service;

import com.hackernews.backend.model.Upvote;
import com.hackernews.backend.repository.UpvoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UpvoteService {
    @Autowired
    private UpvoteRepository upvoteRepo;

    public Upvote addToUpvotes(String username, Integer postId) {
        Upvote upvote = new Upvote(username, postId);
        return upvoteRepo.save(upvote);
    }

    public List<Upvote> getUpvotesByUser(String username) {
        return upvoteRepo.getUpvoteByUsername(username);
    }

    public List<Upvote> getUpvotesOnPost(Integer postId) {
        return upvoteRepo.getUpvotesByPostId(postId);
    }

    public Integer deleteUpvote(String username, Integer postId) {
        return upvoteRepo.deleteUpvoteByUsernameEqualsAndPostIdEquals(username, postId);
    }
}
