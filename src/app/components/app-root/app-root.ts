import { KEY_LOCAL_STORE_USER } from './../../util/Constants';
import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from './../../service/utilitario.service';
import { Usuario } from './../../model/Usuario';

@Component({
    selector: 'app-root',
    templateUrl: './app-root.html',
    styleUrls: ['./app-root.css']
})
export class AppRoot implements OnInit {

    /**Usuario autenticado en el sistema*/
    private userAutenticado: Usuario;

    /**
     * Constructor del componente Header del app
     * @param util, service utilitario
     */
    constructor(private util: UtilitarioService) { }

    /**
     * Inicializa el componente una vez Angular haya mostrado las propiedades
     */
    ngOnInit() {

        //se configura el usuario autenticado
        this.setUsuarioAutenticado();
    }

    /**
     * Metodo que permite obtener el usuario autenticado en el sistema
     */
    private setUsuarioAutenticado(): void {
        this.userAutenticado = this.util.getUsuarioAutenticado();
    }
}
