import { Component, OnInit } from '@angular/core';

/**
 * Componente para las parametrizaciones iniciales antes de que los usuarios
 * ejecuten algun proceso especifico en los modulos
 */
@Component({
    selector: 'app-parametrizaciones',
    templateUrl: './parametrizacion-registros.component.html'
})
export class ParametrizacionRegistrosComponent implements OnInit {

    /** Constantes para identificar el modulo seleccionado */
    private CORRESPONDENCIA: number = 1;
    private SOLICITUD_CERTIFICADOS: number = 2;
    private DEMANDA: number = 3;

    /** style para el tab seleccionado */
    private style_tab_selected = {
        'background-color': '#186ba0',
        'border': '1px solid #156090',
        'color': '#FFFFFF',
        'cursor': 'pointer'
    };

    /** style para el tab NO seleccionado */
    private style_tab_not_selected = {
        'cursor': 'pointer',
        'border': '1px solid #ddd'
    };

    /** indica el modulo seleccionado por el user */
    private moduloSeleccionado: number;

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void { }

    /**
     * Metodo que visualiza el tab para el modulo seleccionado
     * @param modulo , indica el modulo seleccionado por el usuario
     */
    private showTabModulo(modulo: number): void {
        this.moduloSeleccionado = modulo;
    }
}