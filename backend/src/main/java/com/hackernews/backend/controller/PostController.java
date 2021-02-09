package com.hackernews.backend.controller;

import com.hackernews.backend.model.Comment;
import com.hackernews.backend.model.Post;
import com.hackernews.backend.service.CommentService;
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
    @Autowired
    private CommentService commentService;

    //Get All Posts
    @CrossOrigin
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
    }

    //Get Post by postId
    @CrossOrigin
    @GetMapping("/posts/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable("postId") Integer postId) {
        try {
            return new ResponseEntity<>(postService.getPostById(postId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Create new post
    @CrossOrigin
    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        System.out.println("Post Creation Successful");
        return new ResponseEntity<>(postService.savePost(post), HttpStatus.CREATED);
    }

    //Update post which can be used for up-voting
    @CrossOrigin
    @PatchMapping("/posts/{postId}")
    private ResponseEntity<Post> updatePost(@PathVariable("postId") String username, @RequestBody Post post) {
        try {
            return new ResponseEntity<>(postService.savePost(post), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Get all comments on a post
    @CrossOrigin
    @GetMapping("/posts/{postId}/comments")
    private ResponseEntity<List<Comment>> getAllCommentsOnPost(@PathVariable("postId") Integer postId) {
        return new ResponseEntity<>(commentService.getCommentByPostId(postId), HttpStatus.OK);
    }

    //Get all comments on a post including all thread replies
    @CrossOrigin
    @GetMapping("/posts/{postId}/threads")
    private ResponseEntity<List<Comment>> getAllThreadsOnPost(@PathVariable("postId") Integer postId) {
        return new ResponseEntity<>(commentService.getThreadsByPostId(postId), HttpStatus.OK);
    }
}
