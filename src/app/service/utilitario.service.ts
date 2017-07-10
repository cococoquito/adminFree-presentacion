import { KEY_LOCAL_STORE_USER } from './../util/Constants';
import { Usuario } from './../model/Usuario';
import { Injectable } from '@angular/core';

/**
 * Service que contiene los metodos utilitarios del sistema
 */
@Injectable()
export class UtilitarioService {

    /**
     * Metodo que permite obtener el usuario autenticado en el sistema
     */
    public getUsuarioAutenticado(): Usuario {
        let userIn = localStorage.getItem(KEY_LOCAL_STORE_USER);
        if (userIn) {
            return JSON.parse(userIn);
        }
        return null;
    }
}