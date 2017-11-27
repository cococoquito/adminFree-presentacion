import { NomenclaturasConsecutivosVO } from './../../c-model/a-admin/parametrizacion/NomenclaturasConsecutivosVO';
import { ActualizacionItemsDTO } from './../../c-model/a-admin/parametrizacion/ActualizacionItemsDTO';
import { CommonVO } from './../../c-model/a-admin/parametrizacion/CommonVO';
import { UsuariosDTO } from './../../c-model/a-admin/seguridad/UsuariosDTO';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CambioClaveDTO } from './../../c-model/b-seguridad/CambioClaveDTO';
import { UsuarioLoginDTO } from './../../c-model/b-seguridad/UsuarioLoginDTO';
import { RoleDTO } from './../../c-model/a-admin/seguridad/RoleDTO';
import { UsuariosVO } from './../../c-model/b-seguridad/UsuariosVO';
import { KEY_FECHA_INGRESO, KEY_LOCAL_STORE_USER, URL_BASE } from './../../z-util/Constants';

/**
 * Contiene los servicios para el modulo de Administrador y de Seguridad
 */
@Injectable()
export class AdministradorService {

    /** se utiliza para las notificaciones cuando el usuario se autentica */
    public behaviorAutenticacion: BehaviorSubject<UsuarioLoginDTO> = new BehaviorSubject<UsuarioLoginDTO>(null);

    /** Path raiz de los servicios REST del modulo administrativo */
    private static PATH = 'admin/';    

    /** Path para el recurso de autenticacion en el sistema */
    private static PATH_INICIAR_SESION = 'iniciar_sesion';

    /** Path para el recurso de cambio de clave */
    private static PATH_CAMBIAR_CLAVE = 'cambiar_clave';

    /** Path para listar los modulos del sistema */
    private static PATH_LISTAR_MODULOS = 'listar_modulos';

    /** Path para listar los ROLES del sistema */
    private static PATH_LISTAR_ROLES = 'listar_roles';

    /** Path para obtener el ROLE de acuerdo a su ID */
    private static PATH_GET_ROLE = 'role/';

    /** Path para eliminar el ROLE de acuerdo a su ID */
    private static PATH_ELIMINAR_ROLE = 'role/eliminar/';

    /** Path para crear o editar un ROLE */
    private static PATH_CREAR_EDITAR_ROLE = 'crear_editar_role';

    /** Path para listar los usuarios activos del sistema */
    private static PATH_LISTAR_USUARIOS = 'listar_usuarios';

    /** Path para crear o editar usuario */
    private static PATH_CREAR_EDITAR_USER = 'crear_editar_user';

    /** Path para eliminar el user */
    private static PATH_ELIMINAR_USER = 'eliminar_user';

    /** Path para restablecer la clave del user */
    private static PATH_RESTABLECER_CLAVE = 'restablecer_clave';

    /** Path para listar los items parametricos de una tabla especifica */
    private static PATH_LISTAR_ITEMS = 'listar_items/';

    /** Path para insertar un item parametrico */
    private static PATH_CREAR_ITEM = 'insertar_item/';

    /** Path para eliminar un item parametrico */
    private static PATH_ELIMINAR_ITEM = 'eliminar_item/';

    /** Path para editar un conjunto de items parametricos */
    private static PATH_EDITAR_ITEMS = 'editar_items';

    /** Path para listar los tipos de consecutivos de correspondencia */
    private static PATH_LISTAR_TIPOS_CONSECUTIVOS = 'listar_tipos_consecutivos';

    /** Path para eliminar un tipo de consecutivo de correspondencia */
    private static PATH_ELIMINAR_TIPO_CONSECUTIVO = 'eliminar_tipo_consecutivo/';

    /** Path que permite insertar un tipo de consecutivo de correspondencia */
    private static PATH_INSERTAR_TIPO_CONSECUTIVO = 'insertar_tipo_consecutivo';

    /** Path que permite editar un tipo de consecutivo de correspondencia */
    private static PATH_EDITAR_TIPO_CONSECUTIVO = 'editar_tipo_consecutivo';

    /** Encabezado del request donde se especifica el tipo de contenido y el tipo de producer */
    private headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });

    /** Son las opciones donde se especifica en cada request */
    private options = new RequestOptions({ headers: this.headers });

    /**
     * Constructor del service
     * @param http , service para consumir los servicios
     * @param datePipe , pipe para los formatos de la fecha
     */
    constructor(private http: Http, private datePipe: DatePipe) { }

    /**
     * Metodo que permite iniciar sesion sobre la APP
     * @param user, usuario que intenta autenticarse en el sistema
     */
    public iniciarSesion(user: UsuariosVO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_INICIAR_SESION, user, this.options);
    }

    /**
     * Metodo que permite cambiar la clave del usuario autenticado
     * @param cambioClave, DTO con los datos de la nueva clave a cambiar
     */
    public cambiarClave(cambioClave: CambioClaveDTO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_CAMBIAR_CLAVE, cambioClave, this.options);
    }

    /**
     * Metodo que permite obtener todos los modulos del sistema
     */
    public getModulosItems(): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_LISTAR_MODULOS);
    }

    /**
     * Metodo que permite obtener todos los ROLES del sistema
     */
    public getRoles(): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_LISTAR_ROLES);
    }

    /**
     * Metodo que permite obtener el detalle del ROLE
     * @param idRole , identificador del ROLE
     */
    public getDetalleRole(idRole: number): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_GET_ROLE + idRole);
    }

    /**
     * Metodo que permite eliminar el ROLE del sistema
     * @param idRole , identificador del ROLE
     */
    public eliminarRole(idRole: number): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_ELIMINAR_ROLE + idRole);
    }

    /**
     * Metodo que permite crear o editar un ROL en el sistema
     * @param role , DTO con los datos del ROL a editar o crear
     */
    public crearEditarRole(role: RoleDTO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_CREAR_EDITAR_ROLE, role, this.options);
    }

    /**
     * Metodo que permite listar los usuarios activos en el sistema
     */
    public listarUsuariosActivos(): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_LISTAR_USUARIOS);
    }

    /**
     * Metodo que permite crear o editar un USER en el sistema
     * @param user , DTO con los datos del USER a editar o crear
     */
    public crearEditarUsuario(user: UsuariosDTO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_CREAR_EDITAR_USER, user, this.options);
    }

    /**
     * Metodo que permite eliminar un usuario en el sistema
     * @param usuario, DTO con los datos del usuario a eliminar
     */
    public eliminarUsuario(user: UsuariosDTO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_ELIMINAR_USER, user, this.options);
    }

    /**
     * Metodo que permite restablecer la clave a un usuario
     * @param usuario, DTO con los datos del usuario a restablecer la clave
     */
    public restablecerClaveUsuario(user: UsuariosDTO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_RESTABLECER_CLAVE, user, this.options);
    }

    /**
     * Metodo que permite listar los items parametricos de una tabla 
     * especifica de acuerdo al identificador del item
     * @param idItem, identifica a que tabla parametrica va relacionado el item
     */
    public getItemsParametricos(idItem: number): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_LISTAR_ITEMS + idItem);
    }

    /**
     * Metodo que permite insertar un item parametrico en el sistema
     * 
     * @param nombre , nombre del nuevo item a insertar
     * @param idItem, identifica a que tabla parametrica va relacionado el item
     */
    public insertarItemParametrico(nombre: string, idItem: number): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_CREAR_ITEM + nombre + "/" + idItem);
    }

    /**
     * Metodo que permite eliminar un item parametrico del sistema
     * @param id , identificador del item a eliminar
     * @param idItem, identifica a que tabla parametrica va relacionado el item
     */
    public eliminarItemParametrico(id: number, idItem: number): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_ELIMINAR_ITEM + id + "/" + idItem);
    }

    /**
     * Metodo que permite editar un conjunto de items parametricos
     * @param items , lista de items a editar
     * @param idItem, identifica a que tabla parametrica va relacionado el item
     */
    public editarItemsParametrico(items: Array<CommonVO>, idItem: number): Observable<Response> {

        // se debe crear una nueva lista dado que el evento (change) agrega
        // una variable que a nivel de negocio no la contiene _$visited
        let itemsModificados = new Array<CommonVO>();
        let itemModificado = null;
        for (let item of items) {
            itemModificado = new CommonVO();
            itemModificado.id = item.id;
            itemModificado.nombre = item.nombre;
            itemsModificados.push(itemModificado);
        }

        // se construye el wraper para enviar al servicio
        let parametro = new ActualizacionItemsDTO();
        parametro.items = itemsModificados;
        parametro.idItem = idItem;

        // se procede a ejecutar el servicio para la actualizacion de los items
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_EDITAR_ITEMS, parametro, this.options);
    }

    /**
     * Metodo que permite consultar todos los tipos de consecutivos de correspondencia en estado ACTIVO
     */
    public listarTiposConsecutivos(): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_LISTAR_TIPOS_CONSECUTIVOS);
    }

    /**
     * Metodo que permite eliminar un tipo de consecutivo de correspondencia
     * 
     * @param id , identificador del tipo de consecutivo a eliminar
     */
    public eliminarTipoConsecutivo(id: number): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_ELIMINAR_TIPO_CONSECUTIVO + id);
    }    

    /**
     * Metodo que permite insertar un tipo de consecutivo de correspondencia
     * 
     * @param tipo, VO con los datos del tipo de consecutivo de correspondencia
     */
    public insertarTipoConsecutivo(tipo: NomenclaturasConsecutivosVO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_INSERTAR_TIPO_CONSECUTIVO, tipo, this.options);
    }

    /**
     * Metodo que permite editar un tipo de consecutivo de correspondencia
     * 
     * @param tipo, VO con los datos del tipo de consecutivo de correspondencia
     */
    public editarTipoConsecutivo(tipo: NomenclaturasConsecutivosVO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.PATH + AdministradorService.PATH_EDITAR_TIPO_CONSECUTIVO, tipo, this.options);
    }

    /**
     * Metodo que permite notificar a los susbcritores que el usuario esta autenticado
     * @param user, usuario autenticado en el sistema
     */
    public notificarUserAutenticado(user: UsuarioLoginDTO): void {
        // se almacena el usuario y la fecha de ingreso en el local storage
        localStorage.setItem(KEY_LOCAL_STORE_USER, JSON.stringify(user));
        localStorage.setItem(KEY_FECHA_INGRESO, this.datePipe.transform(new Date(), 'dd/MM/yyyy - h:mma'));

        // se notifica a los suscriptores que el user se encuentra autenticado
        this.behaviorAutenticacion.next(null);
    }

    /**
     * Metodo que permite notificar a los susbcritores que el usuario cerro session
     */
    public notificarUserLogout() {
        // se elimina el usuario y la fecha de ingreso del localStorage
        localStorage.removeItem(KEY_LOCAL_STORE_USER);
        localStorage.removeItem(KEY_FECHA_INGRESO);

        // se notifica a los suscriptores que el user se encuentra logout
        this.behaviorAutenticacion.next(null);
    }

    /**
     * Metodo que permite obtener el usuario autenticado en el sistema
     */
    public getUsuarioAutenticado(): UsuarioLoginDTO {
        let userIn = localStorage.getItem(KEY_LOCAL_STORE_USER);
        if (userIn) {
            return JSON.parse(userIn);
        }
        return null;
    }
}