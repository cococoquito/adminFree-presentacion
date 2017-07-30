import { Component, OnInit, OnDestroy } from '@angular/core';

/**
 * Componente para la administracion de los Usuarios del sistema
 */
@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-usuarios.component.html'
})
export class AdminUsersComponent implements OnInit, OnDestroy {

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {
        console.log("se init el admin-users");
    }

    ngOnDestroy(): void {
        console.log("se destruyo el admin-users");
    }
}