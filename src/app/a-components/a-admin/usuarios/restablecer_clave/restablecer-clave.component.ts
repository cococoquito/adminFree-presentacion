import { Component, OnInit, OnDestroy } from '@angular/core';

/**
 * Componente para la restablacion de la clave de los usuarios
 */
@Component({
    selector: 'app-restablecer-clave',
    templateUrl: './restablecer-clave.component.html'
})
export class RestablecerClaveComponent implements OnInit, OnDestroy {

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {
        console.log("se init el app-restablecer-clave");
    }

    ngOnDestroy(): void {
        console.log("se destruyo el app-restablecer-clave");
    }
}