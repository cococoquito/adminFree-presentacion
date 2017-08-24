import { RolesVO } from './../../../../c-model/a-admin/seguridad/RolesVO';
import { ComponentCommon } from './../../../../z-util/Component-common';
import { STYLE_SUCCESS_CENTER, EXITOSO_MSJ_USER_ELIMINADO, EXITOSO_MSJ_USUARIO_EDITADO, EXITOSO_MSJ_USUARIO_CREADO, SI, NO } from './../../../../z-util/Constants';
import { UsuariosDTO } from './../../../../c-model/a-admin/seguridad/UsuariosDTO';
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
export class AdminUsersComponent extends ComponentCommon implements OnInit {

    /**lista de usuarios parametrizados en el sistema*/
    private usuarios: Array<UsuariosDTO>;

    /**lista de ROLES parametrizados en el sistema, se utiliza para el <select>*/
    private roles: Array<RolesVO>;

    /**Esta variable se utiliza para visualizar el panel de creacion o edicion del USER*/
    private crearEditarUser: UsuariosDTO;

    /**bandera que identifica si el usuario es abogado, se utiliza para la creacion o edicion del user*/
    private esUsuarioAbogado: boolean;

    /**
    * Constructor del componente para la administracion de los USUARIOS
    * @param utilService, service con las funciones utilitarias
    * @param alertService, service para la comunicacion del componente de mensaje de alerta
    * @param confirmationService, servicio para la visualizacion del modal de confirmacion
    * @param administradorService, contiene los servicios administrativo
    */
    constructor(
        protected utilService: UtilitarioService,
        protected alertService: AlertService,
        private confirmationService: ConfirmationService,
        private administradorService: AdministradorService) {
        super(utilService, alertService);
    }

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
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo soporta el evento click del boton Crear USER
     */
    private abrirPanelCrearUser(): void {

        // se crea el nuevo USER para ser parametrizado en el sistema
        this.crearEditarUser = new UsuariosDTO();
        this.crearEditarUser.roles = this.selectValueDefaultNumber;
        this.esUsuarioAbogado = false;

        // se configura los datos para la visualizacion del panel
        this.abrirPanel();
    }

    /**
     * Metodo soporta el evento click del boton Editar USER
     * @param userEditar, es el usuario seleccionado desde la tabla 
     */
    private abrirPanelEditarUser(userEditar: UsuariosDTO): void {

        // se configura los datos del usuario seleccionado
        this.crearEditarUser = new UsuariosDTO();
        this.crearEditarUser.idUsuario = userEditar.idUsuario;
        this.crearEditarUser.nombre = userEditar.nombre;
        this.crearEditarUser.nombreUsuario = userEditar.nombreUsuario;
        this.crearEditarUser.roles = userEditar.roles;
        this.crearEditarUser.esAbogado = userEditar.esAbogado;
        this.crearEditarUser.nombreRole = userEditar.nombreRole;
        this.esUsuarioAbogado = (userEditar.esAbogado == SI);

        // se configura los datos para la visualizacion del panel
        this.abrirPanel();
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

    /**
     * Metodo que sorporta el evento click del icono eliminar USER
     * @param user , Usuario seleccionado desde la tabla de usuarios
     */
    private eliminarUser(user: UsuariosDTO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se procede abrir la ventana de confirmacion
        this.confirmationService.confirm({
            message: '¿Está seguro de que desea eliminar el siguiente USUARIO? <br/><strong>' + user.nombre + '</strong>',
            header: 'Confirmación',
            icon: 'fa fa-trash',
            accept: () => {

                // se muestra el modal de carga
                this.utilService.displayLoading(true);

                // susbripcion para la eliminacion del Usuario
                this.administradorService.eliminarUsuario(user).subscribe(
                    data => {
                        // se configuran los usuarios retornados
                        this.usuarios = data.json();

                        // se muestra el mensaje exitoso en pantalla
                        this.alertService.showAlert(EXITOSO_MSJ_USER_ELIMINADO, STYLE_SUCCESS_CENTER, false);

                        // se cierra el modal de carga
                        this.utilService.displayLoading(false);
                    },
                    error => {
                        this.showErrorSistema(error);
                    }
                );
            }
        });
    }

    /**
     * Metodo que sorporta el evento click del icono restablecer contraseña
     * @param user  , Usuario seleccionado desde la tabla de usuarios
     */
    private restablecerClave(user: UsuariosDTO): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se procede abrir la ventana de confirmacion
        this.confirmationService.confirm({
            message: '¿Está seguro de restablecer la contraseña del usuario? <br/><strong>' + user.nombre + '</strong><br/><br/> El sistema restablecerá el valor por la contraseña por defecto.',
            header: 'Confirmación',
            icon: 'fa fa-lock',
            accept: () => {

                // se muestra el modal de carga
                this.utilService.displayLoading(true);

                // susbripcion para restablecer la clave
                this.administradorService.restablecerClaveUsuario(user).subscribe(
                    data => {
                        // se muestra el mensaje exitoso en pantalla
                        this.alertService.showAlert(data.text(), STYLE_SUCCESS_CENTER, false);

                        // se cierra el modal de carga
                        this.utilService.displayLoading(false);
                    },
                    error => {
                        this.showErrorSistema(error);
                    }
                );
            }
        });
    }

    /**
     * Metodo que soporta el evento click del boton cancelar del panel de creacion o edicion USUARIO
     */
    private cerrarPanelUser(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se limpia esta variable para retornar a la lista de USUARIOS
        this.crearEditarUser = null;
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
                this.showErrorSistema(error);
            }
        );
    }

    /**
     * Metodo que permite crear o editar el Usuario en el sistema
     */
    public crearEditarUsuarioSistema(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se organiza los datos del usuario antes de persistir
        this.organizarDatosUsuario();

        // se verifica si es valido para persistir el usuario
        if (this.isPersistirUsuario()) {

            // se muestra el modal de carga
            this.utilService.displayLoading(true);

            // se invoca el servicio para crear o editar el USUARIO
            this.administradorService.crearEditarUsuario(this.crearEditarUser).subscribe(
                data => {
                    // se configura los usuarios retornado por el servicio
                    this.usuarios = data.json();

                    // se muestra el mensaje exitoso en pantalla
                    this.alertService.showAlert(this.crearEditarUser.idUsuario ? EXITOSO_MSJ_USUARIO_EDITADO : EXITOSO_MSJ_USUARIO_CREADO, STYLE_SUCCESS_CENTER, false);

                    // se limpia la variable del USER para retornar a la lista de USUARIOS ACTIVO
                    this.crearEditarUser = null;

                    // se cierra el modal de carga
                    this.utilService.displayLoading(false);
                },
                error => {
                    this.showErrorSistema(error);
                }
            );
        } else {
            // si no es para persistir el usuario se retorna a la lista de USUARIOS ACTIVO
            this.crearEditarUser = null;
        }
    }

    /**
     * Metodo que es invocado por lo metodos para visualizar el panel de creacion o edicio USER
     */
    private abrirPanel(): void {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se indica que el usuario no ha dado commit
        this.submitted = false;

        // se carga los roles activos del sistema
        if (!this.roles) {
            this.getRoles();
        }
    }

    /**
     * Metodo que permite organizar los datos del usuario antes de persistir
     */
    private organizarDatosUsuario(): void {

        // se configura la bandera que determina si el user es un abogado
        this.crearEditarUser.esAbogado = (this.esUsuarioAbogado) ? SI : NO;

        // se eliminan los espacios en blanco
        this.crearEditarUser.nombre = this.crearEditarUser.nombre.trim();
        this.crearEditarUser.nombreUsuario = this.crearEditarUser.nombreUsuario.trim();
    }

    /**
     * Metodo que permite identificar si hay alguna modificacion o si el usuario es nuevo 
     * para proceder a invocar el servicio de actualizacion o creacion de usuarios
     */
    private isPersistirUsuario(): boolean {

        // es valido si es creacion de usuario
        if (this.crearEditarUser.idUsuario == null) {
            return true;
        }

        // se busca el usuario que se prentende a editar
        for (let user of this.usuarios) {
            if (user.idUsuario == this.crearEditarUser.idUsuario) {

                // se valida si se modifico el nombre del usuario
                if (this.crearEditarUser.nombre != user.nombre) {
                    return true;
                }

                // se valida si se modifico el usuario de ingreso
                if (this.crearEditarUser.nombreUsuario != user.nombreUsuario) {
                    return true;
                }

                // se valida si se modifico el rol
                if (this.crearEditarUser.roles != user.roles) {
                    return true;
                }

                // se valida si se modifico la bandera que lo identifica como abogado
                if (this.crearEditarUser.esAbogado != user.esAbogado) {
                    return true;
                }
                break;
            }
        }
        return false;
    }
}