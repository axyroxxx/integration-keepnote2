package com.example.note.notebackend.exception;

public class NoteAlreadyExistsException extends Exception{
    public NoteAlreadyExistsException(String message)
    {
        super(message);
    }

}
