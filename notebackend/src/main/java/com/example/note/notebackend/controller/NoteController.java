package com.example.note.notebackend.controller;

import com.example.note.notebackend.entity.Note;
import com.example.note.notebackend.exception.NoteAlreadyExistsException;
import com.example.note.notebackend.exception.NoteNotFoundExeption;
import com.example.note.notebackend.services.NoteService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class NoteController {

    NoteService noteService;
    private ResponseEntity responseEntity;

    @Autowired
    public NoteController(NoteService noteService){
        this.noteService = noteService;
    }

    @PostMapping("/note")
    public ResponseEntity saveNote(@RequestBody Note note,HttpServletRequest request){
        try {
            String authheader=  request.getHeader("Authorization");
            String token =  authheader.substring(7);
            System.out.println(token);
            String username =   Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody().getSubject();
            note.setUsername(username);
            Note createdNote = noteService.saveNote(note);
            responseEntity = new ResponseEntity(createdNote, HttpStatus.CREATED);
        }
        catch (NoteAlreadyExistsException e){
            responseEntity = new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
        catch (Exception e){
            responseEntity = new ResponseEntity("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @GetMapping("/notes")
    public ResponseEntity getNotes(HttpServletRequest request){
        try {
            String authheader=  request.getHeader("Authorization");
            String token =  authheader.substring(7);
            System.out.println(token);
            String username =   Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody().getSubject();

            //String username = (String) request.getAttribute("username");
            System.out.println("IN controller:"+username);
            List<Note> notesList = noteService.getAllNotes(username.trim());
            System.out.println("IN controller:"+notesList);
            responseEntity = new ResponseEntity(notesList, HttpStatus.OK);
        }
        catch (NoteNotFoundExeption e){
            System.out.println("IN controller:"+e.getMessage());
            responseEntity = new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }

        return responseEntity;
    }
}
