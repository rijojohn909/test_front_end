import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import party from "party-js";
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  logoutDiv:boolean=false
  isCollapse:boolean=true
  fundTansferSuccessMsg:string=''    
  fundTansferErrorMsg:string=''
  user:string=''
  currentAcno:Number=0
  balance:Number=0
  depositeMsg:string=''
  acno:any=""
  deleteConfirm:boolean=false
  deleteSpinnerDiv:boolean=false

  fundTransferForm = this.fb.group({
    toAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  depositeForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){

  }

  ngOnInit(): void {
    // to check whether the account holder is already logged in
if(!localStorage.getItem("token")){
  alert("Please Login")
  // navigate to login page
this.router.navigateByUrl('')
}

    if(localStorage.getItem("username")){
    this.user = localStorage.getItem("username") || ''
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '') 
      console.log(this.currentAcno);
      
    }
  }
  
  //button function
collapse(){
  this.isCollapse=!this.isCollapse
}

  getBalance(){
      if(localStorage.getItem("currentAcno")){
        this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '') 
        console.log(this.currentAcno);
        this.api.getBalance(this.currentAcno)
        .subscribe(
          (result:any)=>{
            console.log(result);
            this.balance=result.balance
          }
        )
      }
  }
  // deposite
  deposite(){
    if(this.depositeForm.valid){
      let amount = this.depositeForm.value.amount
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
      this.api.deposite(this.currentAcno,amount)
      .subscribe(
        // success
        (result:any)=>{
          console.log(result);
          this.depositeMsg=result.message
          setTimeout(()=>{
            this.depositeForm.reset()
            this.depositeMsg=''
          },5000)
        },
        (result:any)=>{
          this.depositeMsg = result.error.message
          
        }
      )
    }
    else{
      alert('Invalid form')
    }
  }

 
// showconfetti
  showconfetti(source: any){
    party.confetti(source);
  }

  // transfer()
  transfer(){
if(this.fundTransferForm.valid){
let toAcno = this.fundTransferForm.value.toAcno
let pswd = this.fundTransferForm.value.pswd
let amount = this.fundTransferForm.value.amount
// make api call for fund transfer
this.api.fundTransfer(toAcno,pswd,amount)
.subscribe(
  // success
  (result:any)=>{
this.fundTansferSuccessMsg = result.message
setTimeout(()=>{
  this.fundTansferSuccessMsg=""

},3000)
},
// client-error
(result:any)=>{
  this.fundTansferErrorMsg = result.error.message
  setTimeout(()=>{
    this.fundTansferErrorMsg=""
  },3000)
}
)

}
else{
  alert('Invalid Form!')
}

  }

// clear fundTransfer form
clearFundTransferForm(){
this.fundTansferErrorMsg=""
this.fundTansferSuccessMsg=""
this.fundTransferForm.reset()
}

// logout
logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("currentAcno")
  this.logoutDiv=true

  setTimeout(()=>{
    // navigate to login page
this.router.navigateByUrl('')
this.logoutDiv=false
},5000)
}

//delete account fromnavbar
deleteAccountFromNavbar(){
  this.acno = localStorage.getItem("currentAcno")
  this.deleteConfirm=true
} 

onCancel(){
  this.acno=""
  this.deleteConfirm=false

}

onDelete(event:any){
  // event is the acno of type string  , convert it into number by parsing
  let deleteAcno = JSON.parse(event)
  this.api.deleteAccount(deleteAcno)
  // success
  .subscribe((result:any)=>{
    this.acno=""
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.deleteSpinnerDiv=true

  setTimeout(()=>{
    // navigate to login page
this.router.navigateByUrl('')
this.deleteSpinnerDiv=false

},5000)
  },
  // client error
  (result:any)=>{
    alert(result.error.message)
  }
  
  )
}

}