package com.hackernews.backend.service;

import com.hackernews.backend.model.Favourite;
import com.hackernews.backend.repository.FavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteService {
    @Autowired
    private FavouriteRepository favouriteRepo;

    public Favourite addToFavourite(String username, Integer postId) {
        Favourite favourite = new Favourite(username, postId);
        return favouriteRepo.save(favourite);
    }

    public List<Favourite> getFavouriteByUser(String username) {
        return favouriteRepo.getFavouriteByUsername(username);
    }

    public Favourite deleteFavourite(String username, Integer postId) {
        return favouriteRepo.deleteFavouriteByUsernameAndPostId(username, postId);
    }

}
