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

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void { }
}