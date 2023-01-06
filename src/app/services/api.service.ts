import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

// Register
register(uname:any, acno:any, pswd:any){
 
  const body={
    uname,
    acno,
    pswd
  }
  // server call to register an account and return the result to register component
return this.http.post('',body)
}

}
