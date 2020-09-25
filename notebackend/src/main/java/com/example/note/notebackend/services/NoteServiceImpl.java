package com.example.note.notebackend.services;

import com.example.note.notebackend.entity.Note;
import com.example.note.notebackend.exception.NoteAlreadyExistsException;
import com.example.note.notebackend.exception.NoteNotFoundExeption;
import com.example.note.notebackend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService{

    NoteRepository noteRepository;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public List<Note> getAllNotes(String username) throws NoteNotFoundExeption {
        List<Note> notesList = noteRepository.findAllNoteByusername(username);
        System.out.println("IN service:"+username+notesList);
        if(notesList == null){
            throw new NoteNotFoundExeption("No Note Found");
        }
        return notesList;
    }

    @Override
    public Note saveNote(Note note) throws NoteAlreadyExistsException {
        if(note == null || note.getTitle()==null || note.getTitle()==""){
            throw new NoteAlreadyExistsException("Note is wrong");
        }
        Note createdNote =  noteRepository.save(note);
        if(createdNote == null ){
            throw new NoteAlreadyExistsException("Note not Created");
        }
        return createdNote;
    }
}
