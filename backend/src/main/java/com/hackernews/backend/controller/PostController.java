package com.hackernews.backend.controller;

import com.hackernews.backend.model.Post;
import com.hackernews.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        return new ResponseEntity<List<Post>>(postService.getAllPosts(), HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable("postId") Integer postId) {
        try {
            return new ResponseEntity<Post>(postService.getPostById(postId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return new ResponseEntity<Post>(postService.savePost(post), HttpStatus.CREATED);
    }

    @PatchMapping("/posts/{postId}")
    private ResponseEntity<Post> updatePost(@PathVariable("postId") String username, @RequestBody Post post) {
        try {
            return new ResponseEntity<Post>(postService.savePost(post), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
    }
}
