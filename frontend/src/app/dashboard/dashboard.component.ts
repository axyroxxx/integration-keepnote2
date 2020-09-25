import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  errMessage: string;
  public notes: Note[] = [];
  public note: Note;

  constructor(private router:Router,private notesService:NotesService) { 
    this.note = new Note();
  }

  ngOnInit() {
    console.log("ngon -dash");
    
    this.notesService.getNotes().subscribe(
      data => {
        console.log(data);
        this.notes =data;
      },
      err => {
        console.log(err);
        this.errMessage = 'get error';
      }
    )
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  addnote(){
    if(this.note.text ==='' || this.note.text ==undefined || this.note.title === '' || this.note.title == undefined){
      this.errMessage = 'Title and Text both are required fields';
    }
    else{
      this.notesService.addNote(this.note).subscribe(
        data => {
          this.notes.push(data);
          console.log(data);
        },
        err => {
          this.errMessage = "save error";
        }
      )
    }
  }
}
