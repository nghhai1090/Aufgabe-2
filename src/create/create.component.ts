import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/shared/app-service.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
/**
 * In dieser Klasse findet man die Definition von Methoden, um Aufgaben im Create Page zu implementieren
 */
export class CreateComponent implements OnInit {
/**
 * die String zum speichern Inhalt von Textfelder Firstname 
 */
  firstname: string ="";
/**
 * die String zum speichern Inhalt von Textfelder Lastname 
 */
  lastname: string ="";
/**
 * die String zum speichern Inhalt von Textfelder Email
 */
  email: string="";
/**
 * Konstruktor der Klasse CreateComponent
 * @param appservice AppService wird als Dependency Injection genommen, denn  Methode von AppService sind nötig zum aufbauen der Methoden in Klasse CreateComponent
 */
  constructor(private appservice:AppService) { }
/**
 * MethodeOnInit, nichts besonderes
 */
  ngOnInit(): void {
  }
/**
 * Methode zu checken ob eine der Textfeldern leer ist. Schaltfläche "Create" wird angezeigt nur dann, wenn kein Textfelder leer ist
 * @returns true falls  eine der Textfeldern leer ist, false sonst
 */
  checknull():boolean{
    return this.firstname===""||this.lastname===""||this.email==="";
  }
/**
 * Methode zum erzeugen neuer User Instanz . Die Atrribute dieser Instanz werden aus den Textfeldern genommen. Die neue User 
 * wird dann in Datenbank hinzugefügt ,und danach die Textfeldern werden geleert um bereits zu sein, auf neue Eingabewerte zu warten 
 */
  createUser(){
     const newuser  ={
       firstname: this.firstname,
       lastname: this.lastname,
       email: this.email,
       editing: false
     }  
     this.appservice.createUser(newuser).subscribe(
        data => {
          this.firstname="";
          this.lastname="";
          this.email="";
        }
     )
  }
  
}
