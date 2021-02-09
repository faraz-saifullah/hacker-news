package com.hackernews.backend.repository;

import com.hackernews.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findCommentByPostIdAndParentIdEquals(Integer postId, Integer parentId);
    List<Comment> findCommentByPostId(Integer postId);
    List<Comment> findCommentsByParentIdEquals(Integer parentId);
}
