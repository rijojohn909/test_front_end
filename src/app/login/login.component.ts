import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg:string=''
  successMsg:boolean=false

  // login group
  loginForm = this.fb.group({
    // array
    phno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){

  }

  login(){
    if(this.loginForm.valid){
      let phno = this.loginForm.value.phno
      let pswd = this.loginForm.value.pswd  
      // login call
      this.api.login(phno,pswd)
      .subscribe(
        // success
        (result:any)=>{
          this.successMsg=true
          // store username in local storage
          localStorage.setItem("username",result.username)
          // store current acno
          localStorage.setItem("currentPhno",JSON.stringify(result.currentPhno))
           // store token
           localStorage.setItem("token",result.token)
        // alert(result.message)
        setTimeout(()=>{
           // navigate dashboard
        this.router.navigateByUrl('dashboard')
        },2000)
       
      },
      // client
      (result:any)=>{
         this.errorMsg = result.error.message
      }
      )
    }
    else{
      alert('Invalid Login')
    }

      
  }

}