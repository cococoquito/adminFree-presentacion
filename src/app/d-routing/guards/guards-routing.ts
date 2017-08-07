
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOME, RAIZ, CAMBIO_CLAVE } from './../../z-util/Constants';
import { AdministradorService } from './../../b-service/a-admin/administrador.service';

/**
 * Service que permite proteger los redireccionamiento de la aplicacion
 */
@Injectable()
export class GuardRouting implements CanActivate {

    /**
     * Constructor del Guardian del routing
     * @param router, es el router de la app para el redireccionamiento
     * @param administradorService, contiene los servicios para el modulo administrativo
     */
    constructor(
        private router: Router,
        private administradorService: AdministradorService) { }

    /**
     * Metodo que se activa cuando el router tiene una solicitud de redireccionamiento
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // se obtiene el usuario del localStorage
        let usuarioAutenticado = this.administradorService.getUsuarioAutenticado();

        // se obtiene la URL de la pagina destino
        let requestURL = state.url;

        // se verifica si el usuario esta autenticado
        if (!usuarioAutenticado) {
            //si la pagina invocada no es la de login(RAIZ) el user debe autenticarse
            if (requestURL != RAIZ) {
                this.router.navigate([RAIZ]);
                return false;
            }
        } else {
            // como el user esta autenticado y la invocacion es pagina RAIZ se redirecciona para HOME
            if (requestURL == RAIZ) {
                this.router.navigate([HOME]);
                return false;
            }

            //**************aca se comprueba los privilegios del usuario***************************
            if (requestURL != HOME && requestURL != CAMBIO_CLAVE) {

                // se valida que user si contenga modulos asignados
                let modulos = usuarioAutenticado.rol.modulos;
                let items;
                if (modulos) {
                    for (let modulo of modulos) {

                        // se valida que el modulo si contenga items asignados
                        items = modulo.itemsMenu;
                        if (items) {

                            // se busca si el user tiene privilegios para esta URL
                            for (let item of items) {
                                if (item.urlRouter == requestURL) {
                                    return true;
                                }
                            }
                        }
                    }
                }

                // si llega a esta instancia es porque el user no tiene privilegios para la URL
                this.router.navigate([HOME]);
                return false;
            }
            //**************aca se comprueba los privilegios del usuario***************************
        }

        // si no se altera el redireccionamiento se debe retornar true
        return true;
    }
}