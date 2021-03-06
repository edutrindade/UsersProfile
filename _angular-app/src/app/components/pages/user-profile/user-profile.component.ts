import { NotifyMessageService } from './../../../services/notify-message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserProfileHttpService } from 'src/app/services/http/user-profile-http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;
  errors: {};

  constructor(private formBuilder: FormBuilder,
              private userProfileHttp: UserProfileHttpService,
              private notifyMessage: NotifyMessageService) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.maxLength(255)]],
            email: ['', [Validators.email, Validators.maxLength(255)]],
            password: ['', Validators.minLength(6), Validators.maxLength(16)],
            phone_number: null,
            photo: false
        });
  }

  ngOnInit() {
  }

  submit(){
    this.userProfileHttp
      .update(this.form.value)
      .subscribe(
        (data) => this.notifyMessage.success('Perfil atualizado com sucesso.'),
        (responseError) => {
          if (responseError.status === 422){
            this.errors = responseError.error.errors
          }
        });
      return false;
  }

  onChoosePhoto(files: FileList){
    if (!files.length){
      return;
    }
    this.form.get('photo').setValue(files[0]);
  }

  showErrors(){
    return Object.keys(this.errors).length != 0;
  }

}
