import { ModuloDTO } from './../menu/ModuloDTO';
import { UsuariosVO } from './UsuariosVO';

/**
 * DTO que representa los datos autenticados en el sistema
 */
export class UsuarioSessionDTO {

    /** Objecto que contiene el usuario autenticado en el sistema */
    usuario: UsuariosVO;

    /** Son los modulos que puede visualizar el usuario autenticado */
    modulos: Array<ModuloDTO>;
}