import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ForgotPassService } from 'src/app/core/services/forgot-pass.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  constructor(private _ForgotPassService:ForgotPassService, private _ToastrService:ToastrService, private _Router : Router ){}

step1:boolean=true;
step2:boolean=false;
step3:boolean=false;
email: string = '';
userMsg:string = '';


forgotForm:FormGroup = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email])
});

resetCodeForm:FormGroup = new FormGroup({
  resetCode: new FormControl('', [Validators.required])
})

resetPassForm:FormGroup = new FormGroup({
  newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
})

forgotPassword():void{
  let userEmail=this.forgotForm.value;
  this.email = userEmail.email;
  this._ForgotPassService.forgotpassword(userEmail).subscribe({
  next:(response) =>{
      console.log(response);
      this._ToastrService.success(response.message)  
      this.userMsg = response.message
      this.step1=false;
      this.step2=true;
  },

  error: (err) => {
    this.userMsg = err.error.message
  },
});
}



resetCode():void{
let resetcode=this.resetCodeForm.value
this._ForgotPassService.resetCode(resetcode).subscribe({
  next:(response)=> {
  console.log(response);
  this.userMsg = response.status
  this.step2=false
  this.step3=true

  },
  error:(err)=>{
    this.userMsg = err.error.message

  }
})
}



newPassword():void{
let resetForm=this.resetPassForm.value
resetForm.email = this.email
  this._ForgotPassService.resetPAssword(resetForm).subscribe({
    next:(response)=>{

      if(response.token){
        localStorage.setItem('etoken' , response.token)
        this._Router.navigate(['/home'])
      }
    }
  })
}









}

