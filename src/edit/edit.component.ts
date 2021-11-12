import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/shared/app-service.service';
import { User } from 'src/shared/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
/**
 * In dieser Klasse findet man die Definition von Methoden, um Aufgaben im Edit Page zu implementieren
 */
export class EditComponent implements OnInit {
  /**
   * die String zum Speichern von Inhalt im Textfeldern Firstname, dieser Inhalt nimmt als 
   * Initialisierungswert den Wert im Atrribute Firstname von this.user[0]
   */
  firstname: string="";
    /**
   * die String zum Speichern von Inhalt im Textfeldern Lastname, dieser Inhalt nimmt als 
   * Initialisierungswert den Wert im Atrribute Lastname von this.user[0]
   */
  lastname: string="";
    /**
   * die String zum Speichern von Inhalt im Textfeldern Email, dieser Inhalt nimmt als 
   * Initialisierungswert den Wert im Atrribute Email von this.user[0]
   */
  email: string="";
  /**
   * die String zum Speichern den Wert im Atrribute ID von this.user[0]
   */
  id: string="";
  /**
   * Liste zum Speichern von der User Instanz von Edit Page . Hier speichere ich sie als liste, denn Methode getUser()
   *  der Klasse AppService gibt Instanz von Typ Observable<User[]> aus
   */
  user: User[]=[];
  /**
   * diese Variable sagt aus, ob Edit Page in Edit Mode ist. Wenn Edit Mode ist gültig, ist die Textfelder in GUI bereits zu eingaben von neuen Inhalten. 
   */
  edit:boolean = false;
  /**
   * Konstruktor der Klasse EditComponent
   * @param router ActivateRoute wird als Dependency Injection genommen, um id aus dem Routing URL zu nehmen 
   * @param appservice  AppService wird als Dependency Injection genommen, denn  Methode von AppService sind nötig zum aufbauen der Methoden in Klasse EditComponent
   */
  constructor(private router : ActivatedRoute,private appservice: AppService) {}
  /**
   * Methode zum Laden von Edit Page
   * this.id wird aus Routers Parameter genommen, dananch wird User Instanz aus Datenbank mit Id = this.id geladen
   */
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getUserToEdit();
  }
  /**
   * Methode zum Laden User Instanz aus Datenbank mit Id = this.id
   */
  getUserToEdit(){
    this.appservice.getUser(parseInt(this.id)).subscribe(data=>{
      this.user=data;
      this.firstname=this.user[0].firstname;
      this.lastname=this.user[0].lastname;
      this.email=this.user[0].email;
    })
  }
  /**
   * Methode zu beginnen oder stoppen Edit Mode
   */
  editModeChange(){
    this.edit=!this.edit;
  }
  /**
   * Methode zum Checken ob Edit Mode gültig ist
   * @returns true wenn Edit Page sich in Edit Mode befindet, false sonst 
   */
  checkEditMode(){
    return this.edit===true;
  }
  /**
   * Methode zu aktualisieren der User Instanz . Die neuen Attribute von dieser 
   * Instanz stammen aus den Inhalte in Textfeldern. Dieser Methode wird aufgerufen, wenn man in GUI auf "Save" Schaltfläche klickt 
   */
  editUser(){
    const edituser: User = {
        id:this.user[0].id,
        firstname:this.firstname,
        lastname:this.lastname,
        email:this.email
    };
    this.appservice.updateUser(edituser).subscribe(data=>{
      this.editModeChange();
    })
  }
  /**
   * Methode zum checken ob eine der Textfeldern firstname, lastname, email leer ist. Nur wenn kein Textfelder leer ist
   * , wird Schaltfläche "Save" angezeigt
   * @returns true wenn  eine der Textfeldern firstname, lastname, email leer ist, false sonst
   */
  checknull():boolean{
    return this.firstname===""||this.lastname===""||this.email==="";
  }



}
