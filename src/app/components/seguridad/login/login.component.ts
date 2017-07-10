import { KEY_LOCAL_STORE_USER } from './../../../util/Constants';
import { Usuario } from './../../../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private iniciarSesion(): void {
    let user = new Usuario();
    user.loginClave = "sdfas"
    user.loginUsuario = "sdf";
    localStorage.setItem(KEY_LOCAL_STORE_USER, JSON.stringify(user));
    window.location.reload();




  }

}
