import { ModuloDTO } from './../../../c-model/a-admin/seguridad/ModuloDTO';
import { RoleDTO } from './../../../c-model/a-admin/seguridad/RoleDTO';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilitarioService } from './../../../b-service/z-common/utilitario.service';
import { AdministradorService } from './../../../b-service/a-admin/administrador.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * Componente para el modal de privilegios asignados a un ROLE
 */
@Component({
    selector: 'modal-role-privilegios',
    templateUrl: './rol-privilegio.modal.html'
})
export class RolPrivilegioModal implements OnInit, OnDestroy {

    /** DTO con la informacion del ROLE */
    private role: RoleDTO;

    /** es la subscripción del modal */
    private subscription: Subscription;

    /** bandera que indica cuando se debe visualizar el modal*/
    private modalVisible: boolean = false;

    /**Es el modulo seleccionado del tab de modulos para asignar privilegios*/
    private moduloSeleccionado: ModuloDTO;

    /**
     * Constructor del modal para la visualizacion de privilegios asociados a un ROLE
     * @param utilService, service con las funciones utilitarias
     * @param administradorService, contiene los servicios administrativo
     */
    constructor(
        private utilService: UtilitarioService,
        private administradorService: AdministradorService) { }

    /**
     * PostConstructor donde se obtiene la subscripcion
     */
    ngOnInit(): void {
        // se obtiene la subscripcion del modal
        this.obtenerSubscripcion();
    }

    /**
     * Se debe eliminar las subscripciones realizadas por el componente
     */
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    /**
     * Metodo para obtener la subscripcion para ser notificado
     */
    private obtenerSubscripcion(): void {
        this.subscription = this.utilService.getSubcripcionModalRole().subscribe(
            idRole => {
                // se obtiene los datos del ROLE
                this.getDatosRole(idRole);

                // se hace visible el modal
                this.modalVisible = true;
            }
        );
    }

    /**
     * Metodo que permite obtener los datos del ROLE
     * @param idRole , identificador del ROLE
     */
    private getDatosRole(idRole: number): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los privilegios del ROL
        this.administradorService.getDetalleRole(idRole).subscribe(
            data => {
                // se inicializa las variables
                this.role = data.json();

                // por default se presenta el primer modulo a visualizar en el tab
                this.moduloSeleccionado = this.role.modulos[0];

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            }
        );
    }

    /**
     * Metodo que soporta el evento click del boton cerrar
     */
    private cerrarModal(): void {
        this.role = null;
        this.modalVisible = false;
    }

    /**
     * Metodo que soporta el evento click para los tab de los modulos a seleccionar privilegio
     * @param modulo , es el modulo seleccionado
     */
    private clickModulo(modulo: ModuloDTO): void {
        this.moduloSeleccionado = modulo;
    }
}