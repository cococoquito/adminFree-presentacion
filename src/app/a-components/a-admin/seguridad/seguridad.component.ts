import { Component, OnInit } from '@angular/core';

/**
 * Componente para el submodulo de administracion>>seguridad
 */
@Component({
    selector: 'app-seguridad',
    templateUrl: './seguridad.component.html'
})
export class SeguridadComponent implements OnInit {

    /** Constantes para identificar el tipo de item seleccionado */
    private ADMIN_ROLES: number = 1;
    private ADMIN_USER: number = 2;

    /** indica el tipo de Item seleccionado por el user */
    private itemSeleccionado: number;

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void { }

    /**
     * Metodo que visualiza el tab para el item seleccionado
     * @param tipoItem , indica el tipo de item seleccionado por el usuario
     */
    private showTabItem(tipoItem: number): void {
        this.itemSeleccionado = tipoItem;
    }
}