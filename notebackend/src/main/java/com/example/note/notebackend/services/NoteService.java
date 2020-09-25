package com.example.note.notebackend.services;

import com.example.note.notebackend.entity.Note;
import com.example.note.notebackend.exception.NoteAlreadyExistsException;
import com.example.note.notebackend.exception.NoteNotFoundExeption;

import java.util.List;

public interface NoteService {

    List<Note> getAllNotes(String username) throws NoteNotFoundExeption;

    Note saveNote(Note note) throws NoteAlreadyExistsException;

}
