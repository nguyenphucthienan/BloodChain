import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-manager-user-manager-user-detail',
  templateUrl: './manager-user-manager-user-detail.component.html',
  styleUrls: ['./manager-user-manager-user-detail.component.scss']
})
export class ManagerUserManagerUserDetailComponent implements OnInit, OnDestroy {

  user: User;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: [null, Validators.required],
      birthdate: [null, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.userForm.disable();
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.userForm.patchValue({
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        gender: this.user.gender,
        birthdate: this.user.birthdate,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
        location: this.user.location
      });
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
