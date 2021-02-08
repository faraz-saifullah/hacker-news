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

    public Favourite addToFavourite(Favourite favourite) {
        return favouriteRepo.save(favourite);
    }

    public List<Favourite> getFavouriteByUser(String username) {
        return favouriteRepo.getFavouriteByUsername(username);
    }

}
