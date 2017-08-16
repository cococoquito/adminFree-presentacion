import { UsuariosDTO } from './../../../../c-model/a-admin/usuarios/UsuariosDTO';
import { ConfirmationService } from 'primeng/primeng';
import { AlertService } from './../../../../b-service/z-common/alert.service';
import { AdministradorService } from './../../../../b-service/a-admin/administrador.service';
import { UtilitarioService } from './../../../../b-service/z-common/utilitario.service';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para la administracion de los Usuarios del sistema
 */
@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-usuarios.component.html'
})
export class AdminUsersComponent implements OnInit {

    /**lista de usuarios parametrizados en el sistema*/
    private usuarios: Array<UsuariosDTO>;

    /**
    * Constructor del componente para la administracion del ROL
    * @param utilService, service con las funciones utilitarias
    * @param administradorService, contiene los servicios administrativo
    * @param alertService, service para la comunicacion del componente de mensaje de alerta
    * @param confirmationService, servicio para la visualizacion del modal de confirmacion
    */
    constructor(
        private utilService: UtilitarioService,
        private administradorService: AdministradorService,
        private alertService: AlertService,
        private confirmationService: ConfirmationService) { }

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {

        // se lista los usuarios del sistema
        this.getUsuarios();
    }

    /**
     * Metodo que permite obtener todos los USUARIOS ACTIVOS parametrizados en el sistema
     */
    private getUsuarios(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los USUARIOS ACTIVOS
        this.administradorService.listarUsuariosActivos().subscribe(
            data => {
                // se construye los usuarios consultados
                this.usuarios = data.json();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.utilService.showErrorSistema(error, this.alertService);
            }
        );
    }

    /**
     * Metodo que sorporta el evento click del ver privilegios del ROL del user
     * @param user , Usuario seleccionado desde la tabla de usuarios
     */
    private verDetalleRol(user: UsuariosDTO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se muestra el modal para de ROL con sus privilegios
        this.utilService.displayModalRole(user.roles);
    }
}