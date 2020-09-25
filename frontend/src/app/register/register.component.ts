import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {CustomValidators} from '../custom-validators';
import { AuthenicationService } from '../services/authenication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //public newContact:RegisterContacts;
  public contactForm: FormGroup;
  public minDate = new Date(1990,0,1);
  public maxDate = new Date(1997,0,1);


  constructor(public fb:FormBuilder, private router: Router, private authenticationService: AuthenicationService) {   }
  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(30), Validators.pattern('^[A-Za-z]+$')]],
      // lastName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(30), Validators.pattern('^[A-Za-z]+$')]],
      username: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$"), Validators.email]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', [Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(13),
                        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                        CustomValidators.patternValidator(/[A-Z]/, { hasCapital :true}),
                        CustomValidators.patternValidator(/[!@#$%^&*_+-="|,./?;':",]/, { hasSpecial: true }),
                      this.passwordValidator]],
      address: ['',  [Validators.required,Validators.minLength(20),Validators.maxLength(80)]],
      currentpassword: ['',[Validators.required]]
    },
    {
      validator: CustomValidators.passwordMatchValidator
    }
    );
  }

  get firstName(){
    return this.contactForm.get('firstName');
  }

  // get lastName(){
  //   return this.contactForm.get('lastName');
  // }

  get username(){
    return this.contactForm.get('username');
  }

  get email(){
    return this.contactForm.get('email');
  }

  get address(){
    return this.contactForm.get('address');
  }

  get gender(){
    return this.contactForm.get('gender');
  }

  get dob() {
    return this.contactForm.get('dob');
  }

  get password(){
    return this.contactForm.get('password');
  }

  get currentpassword(){
    return this.contactForm.get('currentpassword');
  }


  addUser(value){
    //console.log(this.contactForm.value);
    //Navigate to Login in after add User
    this.authenticationService.saveUser(this.contactForm.value).subscribe(
      data =>{
        console.log(data);
        this.router.navigate(['/login']);
      },
      err=>{
        console.log(err);
      }
    )
  }

  public passwordValidator(control:AbstractControl): { [key: string]: boolean } | null {
    let re = /[a-z]/;
    if(control.value !== undefined ){
        if(!re.test(control.value)){
          return { 'hasSmall' :true};
        }
      }
      return null;
  }



}
