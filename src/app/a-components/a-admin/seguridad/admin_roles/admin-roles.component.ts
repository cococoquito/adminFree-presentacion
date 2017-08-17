import { ERROR_MSJ_PRIVILEGIOS_SELECCIONADO, EXITOSO_MSJ_ROL_ELIMINADO, EXITOSO_MSJ_ROL_EDITADO, EXITOSO_MSJ_ROL_CREADO, STYLE_SUCCESS_CENTER, STYLE_ERROR_CENTER } from './../../../../z-util/Constants';
import { RoleDTO } from './../../../../c-model/a-admin/usuarios/RoleDTO';
import { Component, OnInit } from '@angular/core';
import { RolesVO } from './../../../../c-model/a-admin/usuarios/RolesVO';
import { ModuloDTO } from './../../../../c-model/a-admin/usuarios/ModuloDTO';
import { ModuloItemDTO } from './../../../../c-model/a-admin/usuarios/ModuloItemDTO';
import { AlertService } from './../../../../b-service/z-common/alert.service';
import { UtilitarioService } from './../../../../b-service/z-common/utilitario.service';
import { AdministradorService } from './../../../../b-service/a-admin/administrador.service';
import { ConfirmationService } from 'primeng/primeng';

/**
 * Componente para la administracion de los Roles del sistema
 */
@Component({
    selector: 'app-admin-roles',
    templateUrl: './admin-roles.component.html'
})
export class AdminRolesComponent implements OnInit {

    /**lista de modulos parametrizados en el sistema*/
    private modulos: Array<ModuloDTO>;

    /**lista de ROLES parametrizados en el sistema*/
    private roles: Array<RolesVO>;

    /**Esta variable se utiliza para visualizar el panel de creacion o edicion del ROL*/
    private rolCrearEditar: RoleDTO;

    /** bandera que identifica si ya se hizo submit */
    private submitted: boolean;

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

        // se lista los ROLES del sistema
        this.getRoles();
    }

    /**
     * Metodo que permite obtener todos los ROLES ACTIVOS parametrizados en el sistema
     */
    private getRoles(): void {

        // se muestra el modal de carga
        this.utilService.displayLoading(true);

        // se invoca el servicio para obtener los ROLES ACTIVOS
        this.administradorService.getRoles().subscribe(
            data => {
                // se construye los ROLES consultados
                this.roles = data.json();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
               this.utilService.showErrorSistema(error, this.alertService);
            }
        );
    }

    /**
     * Metodo soporta el evento click del boton Crear ROL
     */
    private abrirPanelCrearROL(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se crea el nuevo ROL para ser parametrizado en el sistema
        this.rolCrearEditar = new RoleDTO();

        // se configuran los modulos para este ROL
        this.configurarROLModulos();
    }

    /**
     * Metodo soporta el evento click del icono edicion ROL
     * @param rol , es el ROL seleccionado desde la tabla ROLES
     */
    private abrirPanelEdicionROL(rol: RolesVO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se muestra el modal de carga y se limpia la variable global
        this.utilService.displayLoading(true);
        this.rolCrearEditar = null;

        // se invoca el servicio para obtener los privilegios del ROL a editar
        this.administradorService.getDetalleRole(rol.idRole).subscribe(
            data => {
                // se configura los privilegios del ROL
                this.rolCrearEditar = data.json();

                // se configura los privilegios a este ROL
                this.configurarROLModulos();

                // se cierra el modal de carga
                this.utilService.displayLoading(false);
            },
            error => {
                this.utilService.showErrorSistema(error, this.alertService);
            }
        );
    }

    /**
     * Metodo que sorporta el evento click del icono eliminar ROLE
     * @param rol , es el ROL seleccionado desde la tabla ROLES
     */
    private eliminarRol(rol: RolesVO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se procede abrir la ventana de confirmacion
        this.confirmationService.confirm({
            message: '¿Está seguro de que desea eliminar el siguiente ROL? <br/> <div class="text_center"><strong>' + rol.nombre + '</strong></div>',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {

                // se muestra el modal de carga
                this.utilService.displayLoading(true);

                // susbripcion para la eliminacion del ROL
                this.administradorService.eliminarRole(rol.idRole).subscribe(
                    data => {
                        // se configuran los roles retornados
                        this.roles = data.json();

                        // se muestra el mensaje exitoso en pantalla
                        this.alertService.showAlert(EXITOSO_MSJ_ROL_ELIMINADO, STYLE_SUCCESS_CENTER, false);

                        // se cierra el modal de carga
                        this.utilService.displayLoading(false);
                    },
                    error => {
                       this.utilService.showErrorSistema(error, this.alertService);
                    }
                );
            }
        });
    }

    /**
     * Metodo que sorporta el evento click del ver privilegios del ROL
     * @param rol , ROL seleccionado desde la tabla de ROLES
     */
    private verDetalleRol(rol: RolesVO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se muestra el modal para de ROL con sus privilegios
        this.utilService.displayModalRole(rol.idRole);
    }

    /**
     * Metodo que soporta el evento click del boton cancelar del panel de creacion o edicion ROL
     */
    private cerrarPanelRoles(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se limpia esta variable para retornar a la lista de ROLES
        this.rolCrearEditar = null;
    }

    /**
     * Metodo que soporta el evento onchange para los radios de los items del menu
     * @param item , es el item quien ejecuto el evento
     */
    private onchangeItem(item: ModuloItemDTO): void {

        // se debe limpiar los check seleccionado, esto por si lo seleccionaron con anterioridad
        if (item && item.privilegiosEspecificosDTO) {
            for (let especifico of item.privilegiosEspecificosDTO) {
                especifico.seleccionado = false;
            }
        }
    }

    /**
     * Metodo que permite establecer que el user ya hizo submitted
     */
    private onSubmit(): boolean {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se notifica que el user hizo submitted
        this.submitted = true;
        return this.submitted;
    }

    /**
     * Metodo que permite configurar los modulos al ROL, aplica para edicion o creacion
     */
    private configurarROLModulos(): void {

        // solo se cargan los modulos si la lista es nula
        if (!this.modulos) {

            // se muestra el modal de carga
            this.utilService.displayLoading(true);

            // se invoca el servicio para obtener los modulos
            this.administradorService.getModulosItems().subscribe(
                data => {
                    // se configura los modulos consultados
                    this.modulos = data.json();

                    // se asigna los modulos al ROL
                    this.asignarModulosROL();

                    // se cierra el modal de carga
                    this.utilService.displayLoading(false);
                },
                error => {
                   this.utilService.showErrorSistema(error, this.alertService);
                }
            );
        } else {
            // se debe limpiar los check seleccionado, esto por si lo seleccionaron con anterioridad
            for (let modulo of this.modulos) {
                for (let item of modulo.itemsMenu) {
                    item.seleccionado = false;
                    if (item.privilegiosEspecificosDTO) {
                        for (let especifico of item.privilegiosEspecificosDTO) {
                            especifico.seleccionado = false;
                        }
                    }
                }
            }

            // se asigna los modulos al ROL
            this.asignarModulosROL();
        }
    }

    /**
     * Metodo que permite asignar los modulos al ROL para editar o creacion
     */
    private asignarModulosROL(): void {

        // para edicion, se debe configurar los items seleccionados del ROL
        if (this.rolCrearEditar.idRole && this.rolCrearEditar.modulos) {

            // se recorre los modulos del ROL a editar
            for (let moduloROL of this.rolCrearEditar.modulos) {

                // se recorre los items de este modulo
                for (let itemROL of moduloROL.itemsMenu) {

                    // se busca el item de los modulos del sistema
                    let itemSistema = this.buscarModuloItemSistema(itemROL.idItem);
                    itemSistema.seleccionado = true;

                    // se valida si este item tiene privilegios especifico
                    if (itemROL.privilegiosEspecificosDTO && itemSistema.privilegiosEspecificosDTO) {

                        // se recorre los privilegios especificos de este ITEM
                        for (let especificoROL of itemROL.privilegiosEspecificosDTO) {

                            // se recorre los privilegios especifico del item del sistema
                            for (let especificoSistema of itemSistema.privilegiosEspecificosDTO) {

                                // si es el mismo tipo de privilegio especifico se marca como seleccionado
                                if (especificoROL.tipoPrivilegio == especificoSistema.tipoPrivilegio) {
                                    especificoSistema.seleccionado = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }

        // se asigna los modulos al ROL
        this.rolCrearEditar.modulos = this.modulos;

        // se indica que el usuario no ha dado commit
        this.submitted = false;
    }

    /**
     * Metodo que permite buscar un item del modulo a partir de su ID
     * @param idItem , identificador del ITEM
     */
    private buscarModuloItemSistema(idItem: number): ModuloItemDTO {
        for (let modulo of this.modulos) {
            for (let item of modulo.itemsMenu) {
                if (item.idItem == idItem) {
                    return item;
                }
            }
        }
    }

    /**
     * Metodo que permite crear o editar el ROL en el sistema
     */
    private crearEditarROLsistema(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se valida que almenos seleccionaron un privilegio
        if (this.verificarItemSeleccionado()) {

            // se muestra el modal de carga
            this.utilService.displayLoading(true);

            // se invoca el servicio para crear o editar el ROL
            this.administradorService.crearEditarRole(this.rolCrearEditar).subscribe(
                data => {
                    // se configura los roles retornado por el servicio
                    this.roles = data.json();

                    // se muestra el mensaje exitoso en pantalla
                    this.alertService.showAlert(this.rolCrearEditar.idRole ? EXITOSO_MSJ_ROL_EDITADO : EXITOSO_MSJ_ROL_CREADO, STYLE_SUCCESS_CENTER, false);

                    // se limpia la variable del ROL para retornar a la lista de ROLES ACTIVO
                    this.rolCrearEditar = null;

                    // se cierra el modal de carga
                    this.utilService.displayLoading(false);
                },
                error => {
                    this.utilService.showErrorSistema(error, this.alertService);
                }
            );
        } else {
            this.alertService.showAlert(ERROR_MSJ_PRIVILEGIOS_SELECCIONADO, STYLE_ERROR_CENTER, false);
        }
    }

    /**
     * Metodo que retorna true si almenos un item fue selecionado por el usuario
     */
    private verificarItemSeleccionado(): boolean {
        for (let modulo of this.rolCrearEditar.modulos) {
            for (let item of modulo.itemsMenu) {
                if (item.seleccionado) {
                    return true;
                }
            }
        }
    }
}