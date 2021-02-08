package com.hackernews.backend.controller;

import com.hackernews.backend.model.Comment;
import com.hackernews.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/comments")
    private ResponseEntity<List<Comment>> getAllComments() {
        return new ResponseEntity<List<Comment>>(commentService.getAllComments(), HttpStatus.OK);
    }

    @PostMapping("/comments")
    private ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return new ResponseEntity<Comment>(commentService.createComment(comment), HttpStatus.CREATED);
    }

}
