import { Component, OnInit, OnDestroy } from '@angular/core';

/**
 * Componente para la administracion de los Roles del sistema
 */
@Component({
    selector: 'app-admin-roles',
    templateUrl: './admin-roles.component.html'
})
export class AdminRolesComponent implements OnInit, OnDestroy {

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {
        console.log("se init el admin-roles");
    }

    ngOnDestroy(): void {
        console.log("se destruyo el admin-roles");
    }
}