package com.hackernews.backend.controller;

import com.hackernews.backend.model.Favourite;
import com.hackernews.backend.model.Post;
import com.hackernews.backend.model.User;
import com.hackernews.backend.service.FavouriteService;
import com.hackernews.backend.service.PostService;
import com.hackernews.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private FavouriteService favouriteService;

    //Get all users
    @GetMapping("/users")
    private ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    //Get user with username
    @GetMapping("/users/{username}")
    private ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        try {
            User user = userService.getUserByUsername(username);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    //Create new user
    @PostMapping("/users")
    private ResponseEntity<User> createNewUser(@RequestBody User user) {
        return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
    }

    //Update user which can be used to update password and about sections
    @PatchMapping("/users/{username}")
    private ResponseEntity<User> updateUser(@PathVariable("username") String username, @RequestBody User user) {
        try {
            return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    //get all posts by user
    @GetMapping("/users/{username}/posts")
    private ResponseEntity<List<Post>> getAllPostsByUser(@PathVariable("username") String username) {
        try {
            List<Post> posts = postService.getAllPostsByUser(username);
            return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
        }
    }

    //get all favourites by user
    @GetMapping("/users/{username}/favs")
    private ResponseEntity<List<Favourite>> getAllFavouritesByUser(@PathVariable("username") String username) {
        try {
            List<Favourite> favourites = favouriteService.getFavouriteByUser(username);
            return new ResponseEntity<List<Favourite>>(favourites, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<List<Favourite>>(HttpStatus.NOT_FOUND);
        }
    }

    //add to user's favourites
    @PostMapping("/users/{username}/favs")
    private ResponseEntity<Favourite> addToUsersFavourites(@PathVariable("username") String username, @RequestBody Integer postId) {
        try {
            Favourite favourite = favouriteService.addToFavourite(username, postId);
            return new ResponseEntity<Favourite>(favourite, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Favourite>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/{username}/favs")
    private ResponseEntity<Favourite> removeFromFavourites(@PathVariable("username") String username, @RequestBody Integer postId) {
        try {
            Favourite favourite = favouriteService.deleteFavourite(username, postId);
            return new ResponseEntity<Favourite>(favourite, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Favourite>(HttpStatus.NOT_FOUND);
        }
    }
}
