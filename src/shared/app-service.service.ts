import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from './user';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/**
 * Die Serviceklasse des ganzen Projekt. Hier implemenitere ich die Methode getUser, createUser, updateUser, findUser, deleteUser. 
 * dieser Methode werden durch anderen Komponenten aufgerufen, um CRUD Aufgaben durchzuführen
 */
export class AppService {
  /**
   * der URL von json datenbank
   */
  base_url: string ="http://localhost:3000";
  /**
   * Diese String ist zu navigieren zu Array von User Instanzen in Json Datenbank
   */
  users_endpoint = "/users";
  /**
   * diese Attribute sagt aus, dass wir Antworten, Anfragen von HTTP Instanz in JSON Format wünschen
   */
  headers = new HttpHeaders().set('Accept','application/json');
  /**
   * konstruktor der Klasse AppService
   * @param http Klasse HTTPClient wird gebraucht , um Anfragen zu Server zu senden, oder um Antworten aus Server zu bekommen
   */
  constructor(private http:HttpClient) {
   }
   /**
    * diese Methode dient dazu, eine Liste von verfügbaren User Instanzen aufzurufen
    * @returns Liste aller User Instanzen in json datenbank
    */
   getUsers() {
    return this.http.get<User[]>(this.base_url+this.users_endpoint,{headers:this.headers});
   }
   /**
    *  diese Methode dient dazu, die User Instanz mit der gegebenen ID Nummer aufzurufen
    * @param id Id von der User Instanz
    * @returns eine Liste länge 1 , die die User Instanz mit der gegebenen ID Nummer enthält
    */
   getUser(id:number) {
    let parameters = new HttpParams();
    parameters=parameters.set('id',id);
    return this.http.get<User[]>(this.base_url+this.users_endpoint,{headers:this.headers,params:parameters});
   }
   /**
    * Methode zum Hinzufügen von neuer User Instanz zu Json Datenbank
    * @param user die zu hinzufügende User Instanz
    * @returns 
    */
   createUser(user: any){
     return this.http.post(this.base_url+this.users_endpoint,user,{headers:this.headers});
   }
   /**
    * Methode zum Aktualisieren von bestimmter User Instanz
    * @param user die zu aktualisierende User Instanz
    * @returns 
    */
   updateUser(user: User){
     return this.http.put(this.base_url+this.users_endpoint+"/"+user.id, user,{headers:this.headers});
   }
   /**
    * Methode zum Entfernen von User mit der gegebenen ID Nummer aus der Json Datenbank
    * @param userId die ID Nummer von dem zu entfernten User
    * @returns 
    */
   deleteUser(userId:number){
      return this.http.delete(`${this.base_url + this.users_endpoint}/${userId}`);
   }
   /**
    * Methode zu suchen von User mit eingebenen Attributen
    * @param searchfirstname der zu suchende Vorname von User
    * @param searchlastname der zu suchende Nachname von User
    * @param searchemail die zu suchende Email von User
    * Hier wenn ein Parameter leer ist, heißt es, das entsprechende Attribut ist 'egal'
    * @returns User aus Datenbank mit den passenden Attributen
    */
   findUser(searchfirstname : string, searchlastname : string,searchemail: string){
    let parameters = new HttpParams();
    if(searchfirstname!==""){
      parameters=parameters.set('firstname',searchfirstname);
    }
    if(searchlastname!==""){
      parameters=parameters.set('lastname',searchlastname);
    }
    if(searchemail!==""){
      parameters=parameters.set('email',searchemail);
    }
     return this.http.get<User[]>(this.base_url+this.users_endpoint,{headers:this.headers,params:parameters});
   }
  }