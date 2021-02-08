package com.hackernews.backend.service;

import com.hackernews.backend.model.Comment;
import com.hackernews.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepo;

    public Comment createComment(Comment comment) {
        return commentRepo.save(comment);
    }

    public List<Comment> getAllComments() {
        return commentRepo.findAll();
    }

    public Comment getCommentById(Integer id) {
        return commentRepo.findById(id).get();
    }

    public List<Comment> getCommentByPostId(Integer postId) {
        return commentRepo.findCommentByPostIdAndParentIdEquals(postId, 0);
    }

    public List<Comment> getThreadsByPostId(Integer postId) {
        return commentRepo.findCommentByPostId(postId);
    }
}
