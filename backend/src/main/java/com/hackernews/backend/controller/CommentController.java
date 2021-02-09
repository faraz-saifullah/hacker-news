package com.hackernews.backend.controller;

import com.hackernews.backend.model.Comment;
import com.hackernews.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @CrossOrigin
    @GetMapping("/comments")
    private ResponseEntity<List<Comment>> getAllComments() {
        return new ResponseEntity<List<Comment>>(commentService.getAllComments(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/comments")
    private ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return new ResponseEntity<Comment>(commentService.createComment(comment), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/comments/{commentId}")
    private ResponseEntity<Comment> getCommentById(@PathVariable("commentId") Integer commentId) {
        try {
            return new ResponseEntity<>(commentService.getCommentById(commentId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @GetMapping("/comments/{commentId}/threads")
    private ResponseEntity<List<Comment>> getThreadByParentId(@PathVariable("commentId") Integer commentId) {
        try {
            return new ResponseEntity<>(commentService.getCommentsByParentId(commentId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
