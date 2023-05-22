import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
// import party from "party-js";
import { ActivatedRoute, Router } from '@angular/router';


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
  currentPhno:Number=0
  balance:Number=0
  depositeMsg:string=''
  phno:any=""
  deleteConfirm:boolean=false
  deleteSpinnerDiv:boolean=false
uid:any;
users:any=[]
  // fundTransferForm = this.fb.group({
  //   tophno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  //   pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  //   amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  // })

  // depositeForm = this.fb.group({
  //   amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  // })

  editForm = this.fb.group({
    // array
    uname:['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    phno:['',[Validators.required, Validators.pattern('[0-9]*')]],
    ename:['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required]],

  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router, private activatedRoute:ActivatedRoute){

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
    if(localStorage.getItem("currentPhno")){
      this.currentPhno = JSON.parse(localStorage.getItem("currentPhno") || '') 
      console.log(this.currentPhno);
     
    }
   
        
// this.activatedRoute.params.subscribe((data:any)=>{
//   console.log(data['id']);
  
// this.uid=data['id']

// this.api.getDetails(this.currentPhno).subscribe((result:any)=>{
//   console.log(result);
  
// this.users=result.users
// })
// })
  }
  
  //button function
collapse(){
  this.isCollapse=!this.isCollapse
}

  getDetails(){
      if(localStorage.getItem("currentPhno")){
        this.currentPhno = JSON.parse(localStorage.getItem("currentPhno") || '') 
        console.log(this.currentPhno);
        this.api.getDetails(this.currentPhno)
        .subscribe(
          (result:any)=>{
            console.log(result);
            this.users=result.users
          }
        )
      }
  }


  editDetails(){
    
    let uname = this.editForm.value.uname
    let phno = this.editForm.value.phno
    let ename = this.editForm.value.ename
    let email = this.editForm.value.email

    this.api.editDetails(uname,phno,ename,email).
    subscribe(
      // success
      (result:any)=>{
      alert(result.message)
      // navigate login
this.router.navigateByUrl('/dashboard')

    },
    // client
    (result:any)=>{
      alert(result.error.message)
    })
   
  }


  // // deposite
  // deposite(){
  //   if(this.depositeForm.valid){
  //     let amount = this.depositeForm.value.amount
  //     this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
  //     this.api.deposite(this.currentAcno,amount)
  //     .subscribe(
  //       // success
  //       (result:any)=>{
  //         console.log(result);
  //         this.depositeMsg=result.message
  //         setTimeout(()=>{
  //           this.depositeForm.reset()
  //           this.depositeMsg=''
  //         },5000)
  //       },
  //       (result:any)=>{
  //         this.depositeMsg = result.error.message
          
  //       }
  //     )
  //   }
  //   else{
  //     alert('Invalid form')
  //   }
  // }

 
// // showconfetti
//   showconfetti(source: any){
//     party.confetti(source);
//   }

//   // transfer()
//   transfer(){
// if(this.fundTransferForm.valid){
// let toAcno = this.fundTransferForm.value.toAcno
// let pswd = this.fundTransferForm.value.pswd
// let amount = this.fundTransferForm.value.amount
// // make api call for fund transfer
// this.api.fundTransfer(toAcno,pswd,amount)
// .subscribe(
//   // success
//   (result:any)=>{
// this.fundTansferSuccessMsg = result.message
// setTimeout(()=>{
//   this.fundTansferSuccessMsg=""

// },3000)
// },
// // client-error
// (result:any)=>{
//   this.fundTansferErrorMsg = result.error.message
//   setTimeout(()=>{
//     this.fundTansferErrorMsg=""
//   },3000)
// }
// )

// }
// else{
//   alert('Invalid Form!')
// }

//   }

// // clear fundTransfer form
// clearFundTransferForm(){
// this.fundTansferErrorMsg=""
// this.fundTansferSuccessMsg=""
// this.fundTransferForm.reset()
// }

// logout
logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("currentPhno")
  this.logoutDiv=true

  setTimeout(()=>{
    // navigate to login page
this.router.navigateByUrl('')
this.logoutDiv=false
},5000)
}

//delete account fromnavbar
deleteAccountFromNavbar(){
  this.phno = localStorage.getItem("currentPhno")
  this.deleteConfirm=true
} 

onCancel(){
  this.phno=""
  this.deleteConfirm=false

}

onDelete(event:any){
  // event is the acno of type string  , convert it into number by parsing
  let deletePhno = JSON.parse(event)
  this.api.deleteAccount(deletePhno)
  // success
  .subscribe((result:any)=>{
    this.phno=""
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentPhno")
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