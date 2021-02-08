package com.hackernews.backend.repository;

import com.hackernews.backend.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, Integer> {
    List<Favourite> getFavouriteByUsername(String username);
    @Transactional
    Integer deleteFavouriteByUsernameEqualsAndPostIdEquals(String username, Integer postId);
}
