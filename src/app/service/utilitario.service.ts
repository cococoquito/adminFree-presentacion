import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Service que contiene los metodos utilitarios del sistema
 */
@Injectable()
export class UtilitarioService {

    /** se utiliza para las notificaciones del modal del loader */
    public behaviorLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	/**
     * Metodo que permite visualizar el modal Loading
     * @param value , bandera que permite visualizar el modal loading
     */
    public displayLoading(value: boolean) {
        this.behaviorLoading.next(value);
    }
}