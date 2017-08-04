import { ItemsMenuDTO } from './../../../../model/menu/ItemsMenuDTO';
import { AlertService } from './../../../../service/alert.service';
import { UtilitarioService } from './../../../../service/utilitario.service';
import { ModulosDTO } from './../../../../model/menu/ModulosDTO';
import { SeguridadService } from './../../../../service/seguridad.service';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para la administracion de los Roles del sistema
 */
@Component({
    selector: 'app-admin-roles',
    templateUrl: './admin-roles.component.html'
})
export class AdminRolesComponent implements OnInit {

    /**lista de modulos parametrizados en el sistema*/
    private modulos: Array<ModulosDTO>;

    /**Bandera que indica si es creacion de rol*/
    private isCreacionRole: boolean;

    /**
     * Constructor del componente para el cambio de clave
     * @param utilService, service con las funciones utilitarias
     * @param seguridadService, service que contiene los servicioes para la seguridad 
     * @param alertService, service para la comunicacion del el mensaje de alerta
     */
    constructor(
        private utilService: UtilitarioService,
        private seguridadService: SeguridadService,
        private alertService: AlertService) { }

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void { }

    /**
     * Metodo encargado de abrir el panel para la creacion del ROL
     */
    private abrirPanelCrearRol(): void {

        // esta bandera permite habilitar el panel de creacion de ROL
        this.isCreacionRole = true;

        // se cargan los roles del sistema
        this.cargarModulosSistema();
    }

    /**
     * Metodo que soporta el evento de cancelar del panel de roles
     */
    private cerrarPanelRoles(): void {
        this.isCreacionRole = false;
    }

    /**
     * Metodo que soporta el evento onchange para los radios de los items del menu
     * @param item , es el item quien ejecuto el evento
     */
    private onchangeItem(item: ItemsMenuDTO): void {

        // se debe limpiar los check seleccionado, esto por si lo seleccionaron con anterioridad
        if (item && item.privilegiosEspecificosDTO) {
            for (let especifico of item.privilegiosEspecificosDTO) {
                especifico.seleccionado = false;
            }
        }
    }

    /**
     * Metodo que permite cargar los modulos del sistema
     */
    private cargarModulosSistema(): void {

        // solo se cargan los modulos si la lista es nula
        if (!this.modulos) {

            // se muestra el modal de carga
            this.utilService.displayLoading(true);

            // se invoca el servicio para obtener los modulos
            this.seguridadService.getModulosItems().subscribe(
                data => {
                    // se inicializa las variables
                    this.modulos = data.json();

                    // se cierra el modal de carga
                    this.utilService.displayLoading(false);
                },
                error => {
                    // se muestra el mensaje alert danger
                    this.alertService.showAlert(error.text(), "alert alert-danger text_center", false);

                    // se cierra el modal de carga
                    this.utilService.displayLoading(false);
                }
            );
        }
    }
}