package com.hackernews.backend.controller;

import com.hackernews.backend.model.Favourite;
import com.hackernews.backend.model.Post;
import com.hackernews.backend.model.Upvote;
import com.hackernews.backend.model.User;
import com.hackernews.backend.service.FavouriteService;
import com.hackernews.backend.service.PostService;
import com.hackernews.backend.service.UpvoteService;
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

    @Autowired
    private UpvoteService upvoteService;

    //Get all users
    @GetMapping("/users")
    private ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    //Get user with username
    @GetMapping("/users/{username}")
    private ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        try {
            User user = userService.getUserByUsername(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Create new user
    @PostMapping("/users")
    private ResponseEntity<User> createNewUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    //Update user which can be used to update password and about sections
    @PatchMapping("/users/{username}")
    private ResponseEntity<User> updateUser(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //get all posts by user
    @GetMapping("/users/{username}/posts")
    private ResponseEntity<List<Post>> getAllPostsByUser(@PathVariable("username") String username) {
        try {
            List<Post> posts = postService.getAllPostsByUser(username);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //get all favourites by user
    @GetMapping("/users/{username}/favs")
    private ResponseEntity<List<Favourite>> getAllFavouritesByUser(@PathVariable("username") String username) {
        try {
            List<Favourite> favourites = favouriteService.getFavouriteByUser(username);
            return new ResponseEntity<>(favourites, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //add to user's favourites
    @PostMapping("/users/{username}/favs")
    private ResponseEntity<Favourite> addToUsersFavourites(@PathVariable("username") String username, @RequestBody Integer postId) {
        try {
            Favourite favourite = favouriteService.addToFavourite(username, postId);
            return new ResponseEntity<>(favourite, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/{username}/favs")
    private ResponseEntity<Integer> removeFromFavourites(@PathVariable("username") String username, @RequestBody Integer postId) {
        try {
            Integer favourite = favouriteService.deleteFavourite(username, postId);
            return new ResponseEntity<>(favourite, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //get all upvotes by user
    @GetMapping("/users/{username}/upvotes")
    private ResponseEntity<List<Upvote>> getAllUpvotesByUser(@PathVariable("username") String username) {
        try {
            List<Upvote> upvote = upvoteService.getUpvotesByUser(username);
            return new ResponseEntity<>(upvote, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //add to user's favourites
    @PostMapping("/users/{username}/upvotes")
    private ResponseEntity<Upvote> addToUsersUpvotes(@PathVariable("username") String username, @RequestBody Integer postId) {
        try {
            Upvote upvote = upvoteService.addToUpvotes(username, postId);
            return new ResponseEntity<>(upvote, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/{username}/upvotes")
    private ResponseEntity<Integer> removeFromUpvotes(@PathVariable("username") String username, @RequestBody Integer postId) {
        try {
            Integer favourite = upvoteService.deleteUpvote(username, postId);
            return new ResponseEntity<>(favourite, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
