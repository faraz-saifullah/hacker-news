package com.hackernews.backend.service;

import com.hackernews.backend.model.Post;
import com.hackernews.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepo;

    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    public Post getPostById(Integer postId) {
        return postRepo.findById(postId).get();
    }

    public Post savePost(Post post) {
        return postRepo.save(post);
    }

    public List<Post> getAllPostsByUser(String username) {
        return postRepo.findAllByPostedBy(username);
    }
}
