import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/shared/app-service.service';
import { User } from 'src/shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
/**
 * In dieser Klasse findet man die Definition von Methoden, um Aufgaben im Search Page zu implementieren
 */
export class SearchComponent implements OnInit {
  /**
   * liste aller User , die in Search Page angezeigt sollten
   */
  users : User[]=[];
  /**
   * eine Liste zu speichern der gewählten IDs zu entfernen
   */
  choosenId : number[]=[];
  /**
   * die String zum speichern von Inhalt des Suchfelders Firstname.
   */
  searchfirstname : string ="";
  /**
   * die String zum speichern von Inhalt des Suchfelders Lastname.
   */
  searchlastname : string ="";
  /**
   * die String zum speichern von Inhalt des Suchfelders Email.
   */
  searchemail: string ="";
  /**
   * Konstruktor der Klasse SearchComponent 
   * @param appservice AppService wird als Dependency Injection genommen, denn  Methode von AppService sind nötig zum aufbauen der Methoden in Klasse SearchComponent
   * @param router Router wird als Dependency Injection genommen, denn man die Funktion navigate() braucht
   */
  constructor(private appservice: AppService, private router:Router) {}
  /**
   * beim Initialisieren von Search Page sollten die Liste aller Users im Datenbank aufgerufen werden . Hier
   * rufe ich es 2 mal, denn machmal ist die Userliste nicht aktualisiert, wenn man neue User Instanz in Datenbank hinzufügt 
   */
  ngOnInit() {
    this.getAllUsers();
    this.getAllUsers();
  }
  /**
   * Methode zum Aufrufen die Userliste im Datenbank und speichern diese Liste in this.users
   */
  getAllUsers(){
    this.appservice.getUsers().subscribe(data => {
      this.users = data;
    })
  }
  /**
   * Methode zum Suchen von Users mit Attributen entsprechender Suchefelder. Diese werden danach in this.user gespeichert
   * . Die Methode wird angerufen, wenn man auf "GO" in GUI klicke
   */
  findUser(){
    this.appservice.findUser(this.searchfirstname,this.searchlastname,this.searchemail)
    .subscribe(
      data => {this.users = data;}
    )
  }
  /**
   * Methode zum hinzufügen von ID zu this.choosenId. Die ID wird gewählt, indem man auf das Checkbox in GUI klicke.
   * Id wird nur hinzugefügt, wenn die noch nicht in this.choosenId vorhandend ist. 
   * @param id die gewählte ID
   */
  addToChoosenId(id : number){
    if(this.choosenId.indexOf(id)==-1){
      this.choosenId.push(id);
    }
    else{
      this.choosenId.splice(this.choosenId.indexOf(id),1);
    }
    console.log(this.choosenId);
  }
  /**
   * Methode zu entfernen aller Users mit IDs liegt in this.choosenId, danach die Liste "this.users"
   * wird durch aufrufen von this.getAllUsers() aktualisert , dann die liste "this.choosenId" wird geleert. Die Methode wird aufgerufen, wenn
   * man in GUI auf "Delete" Schaltfläche klickt, wenn diese aktiviert ist
   */
  deleteUser() {
    console.log(this.choosenId.length);
    for( let i = 0 ; i < this.choosenId.length; i++){
      console.log(this.choosenId[i]);
      this.appservice.deleteUser(this.choosenId[i]).subscribe(data =>{});
    }
    this.getAllUsers();
    this.getAllUsers();
    this.choosenId=[];
  }
  /**
   * Methode zum Addressieren zu Edit Page von User mit gegebener ID
   * @param id Users ID , diese wird gewählt indem man auf ">" Schaltfläche in einem Tuppel von User Tabelle klicke. 
   */
  toEdit(id:number){
    this.router.navigate(['/edit',id]);
  }
  /**
   * Methode zu prüfen ob this.choosenId leer ist, Falls ja wird Schaltfläche "Delete" in GUI deaktiviert, sonst wird die aktiviert
   * @returns true wenn this.choosenId leer ist, false sonst
   */
  checkChoosenListEmpty(){
    return this.choosenId.length===0;
  }
}

