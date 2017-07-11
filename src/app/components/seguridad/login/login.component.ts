import { UtilitarioService } from './../../../service/utilitario.service';
import { KEY_LOCAL_STORE_USER } from './../../../util/Constants';
import { Usuario } from './../../../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private utilService: UtilitarioService) { }

  ngOnInit() {
  }

  private iniciarSesion(): void {
    this.utilService.displayLoading(true);
    let user = new Usuario();
    user.loginClave = "sdfas"
    user.loginUsuario = "sdf";
    localStorage.setItem(KEY_LOCAL_STORE_USER, JSON.stringify(user));
    this.utilService.displayLoading(false);
    window.location.reload();
  }
}
