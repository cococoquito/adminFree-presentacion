import { ModuloRes } from './../menu/ModuloRes';
import { UsuariosVO } from './UsuariosVO';

/**
 * Clase que retorna el servicio de autenticacion del usuario
 */
export class UsuarioRes {

    /** nombre del ROL que tiene asignado el usuario */
    nombreRole: string;

    /** Objecto que contiene el usuario autenticado en el sistema */
    usuario: UsuariosVO;

    /** Son los modulos que puede visualizar el usuario autenticado */
    modulos: Array<ModuloRes>;
}