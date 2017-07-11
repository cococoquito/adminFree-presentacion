import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { KEY_LOCAL_STORE_USER } from './../util/Constants';
import { Usuario } from './../model/Usuario';

/**
 * Service que contiene los metodos utilitarios del sistema
 */
@Injectable()
export class UtilitarioService {

    /** Comportamientos del loader */
    public loadingBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

	/**
     * Metodo que permite visualizar el modal Loading
     * @param value , bandera que permite visualizar el modal loading
     */
    public displayLoading(value: boolean) {
        this.loadingBehavior.next(value);
    }
}