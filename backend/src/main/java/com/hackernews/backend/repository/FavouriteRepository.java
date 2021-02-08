package com.hackernews.backend.repository;

import com.hackernews.backend.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, Integer> {
    List<Favourite> getFavouriteByUsername(String username);
    Favourite deleteFavouriteByUsernameAndPostId(String username, Integer postId);
}
