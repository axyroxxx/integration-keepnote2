import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient: HttpClient) {

  }

  getNotes(): any {
    const header = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('token')
    });
    console.log(header);
    
    return this.httpClient.get(
      'http://localhost:8090/api/v1/notes',
      {
        headers : header
      }
    );
  }

  addNote(note: Note): any {
    const header = new HttpHeaders({
      'Authorization' : 'Bearer '+ localStorage.getItem('token')
    });

    console.log(note);
    
    return this.httpClient.post(
      'http://localhost:8090/api/v1/note',
      note,
      { headers : header}
    );
  }
}
