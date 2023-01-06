import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    // array
    uname:['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService){ }

  register(){
    if(this.registerForm.valid){
    alert("Register Clicked!")
    let uname = this.registerForm.value.uname
    let acno = this.registerForm.value.acno
    let pswd = this.registerForm.value.pswd
    this.api.register(uname,acno,pswd).subscribe((result:any)=>{
      console.log(result);
      
    })
  }
  else{
    alert("Invalid Form!!")
  }
  }

}
