import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  headers: new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  depositeAmt(deposite: string | null | undefined) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  // register 
  register(uname:any,phno:any,pswd:any,ename:any,email:any){

    const body={
      uname,
      phno,
      pswd,
      ename,
      email
    }
    // server call to register an user  and return response to register component
    return this.http.post('http://localhost:3000/register',body)
  }

  // login
  login(phno:any,pswd:any){
    const body = {
      phno,
      pswd
    }
        // server call to register an account and return response to login component

    return this.http.post('http://localhost:3000/login',body)

  }


 // appending token to http header
 appendToken(){
  // fetch token from local storage
  const token = localStorage.getItem("token")|| ''
  //create http header
  var headers = new HttpHeaders()
  if(token){
     // append token inside headers
  headers= headers.append('access-token',token)
  // overload
  options.headers=headers
  }
 
  return options
  
  
}

// details

getDetails(phno:any){
  return this.http.get('http://localhost:3000/getDetails/'+phno,this.appendToken())
}
   

  // register 
  editDetails(uname:any,phno:any,ename:any,email:any){

    const body={
      uname,
      phno,
      ename,
      email
    }
    // server call to register an user  and return response to register component
    return this.http.post('http://localhost:3000/editDetails',body)
  }



// get balance api
   getBalance(phno:any){
    return this.http.get('http://localhost:3000/getBalance/'+phno,this.appendToken())
  }

  // deposite api
  deposite(acno:any,amount:any){
    const body = {
      acno,
      amount
    }
    return this.http.post('http://localhost:3000/deposite',body,this.appendToken())
  }

  //fundTransfer api
  fundTransfer(toAcno:any,pswd:any,amount:any){
const body={
  toAcno,
  pswd,
  amount
}
return this.http.post('http://localhost:3000/fundTransfer',body,this.appendToken())
  } 

  // all-transactions get
  getAllTransactions(){
    return this.http.get('http://localhost:3000/all-transactions',this.appendToken())
  }

  // delete account Api
  deleteAccount(phno:number){
    return this.http.delete('http://localhost:3000/delete-account/'+phno,this.appendToken())
  }

}