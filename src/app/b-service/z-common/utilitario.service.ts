import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

/**
 * Service que contiene los metodos utilitarios del sistema
 */
@Injectable()
export class UtilitarioService {

    /** se utiliza para las notificaciones del modal del loader */
    public behaviorLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /** Subject para el modal de visualizacion del ROLE con sus privilegios */
    private subModalRolePrivilegios: Subject<any>;

	/**
     * Metodo que permite visualizar el modal Loading
     * @param value , bandera que permite visualizar el modal loading
     */
    public displayLoading(value: boolean) {
        this.behaviorLoading.next(value);
    }

    /**
     * Metodo que permite visualizar el modal de ROLE con sus privilegios
     * @param idRole , identificador del ROLE
     */
    public displayModalRole(idRole: number) {
        if (this.subModalRolePrivilegios) {
            this.subModalRolePrivilegios.next(idRole);
        }
    }

    /**
     * Método que permite dar la inscripcion para el modal del ROLE con sus privilegios
     * Observable<any>, observable con la inscripcion
     */
    public getSubcripcionModalRole(): Observable<any> {
        if (!this.subModalRolePrivilegios) {
            this.subModalRolePrivilegios = new Subject<any>();
        }
        return this.subModalRolePrivilegios.asObservable();
    }
}