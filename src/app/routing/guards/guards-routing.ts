import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LOGIN, HOME, RAIZ } from './../../util/Constants';
import { SeguridadService } from './../../service/seguridad.service';
import { Usuario } from './../../model/Usuario';

/**
 * Service que permite proteger los redireccionamiento de la aplicacion
 */
@Injectable()
export class GuardRouting implements CanActivate {

    /**
     * Constructor del Guardian del routing
     * @param router, es el router de la app para el redireccionamiento
     * @param seguridadService, contiene los servicios de la seguridad de la app
     */
    constructor(
        private router: Router,
        private seguridadService: SeguridadService) { }

    /**
     * Metodo que se activa cuando el router tiene una solicitud de redireccionamiento
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // se obtiene el usuario del localStorage
        let usuarioAutenticado = this.seguridadService.getUsuarioAutenticado();

        // se obtiene la URL de la pagina destino
        let requestURL = state.url;

        // se verifica si el usuario esta autenticado
        if (!usuarioAutenticado) {
            //si la pagina invocada no es la de login el user debe autenticarse
            if (requestURL != LOGIN && requestURL != RAIZ) {
                this.router.navigate([LOGIN]);
                return false;
            }
        } else {
            // como el user esta autenticado y la invocacion es pagina login se redirecciona para HOME
            if (LOGIN == requestURL) {
                this.router.navigate([HOME]);
                return false;
            }

            //**************aca se comprueba los privilegios del usuario***************************
        }

        // si no se altera el redireccionamiento se debe retornar true
        return true;
    }
}