import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KEY_LOCAL_STORE_USER } from './../../util/Constants';
import { Usuario } from './../../model/Usuario';

/**
 * Clase que permite proteger los redireccionamiento de la aplicacion
 */
export class GuardRouting implements CanActivate {

    /**
     * Constructor del Guardian del routing
     * @param router, es el router de la app para el redireccionamiento
     */
    constructor(private router: Router) { }

    /**
     * Metodo que se activa cuando el router tiene una solicitud de redireccionamiento
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let userIn = localStorage.getItem(KEY_LOCAL_STORE_USER);
        if (userIn) {
            // logged in so return true
            return true;
        } else {

        }
        
        // not logged in so redirect to login page with the return url and return false
        return true;
    }
}