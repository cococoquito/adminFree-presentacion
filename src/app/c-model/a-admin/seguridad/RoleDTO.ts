import { ModuloDTO } from './ModuloDTO';

/**
 *  DTO que contiene las propiedades del ROL con sus modulos asociados
 * 
 * @author Carlos Andres Diaz
 */
export class RoleDTO {

    /** es el id del role **/
    public idRole: number;

    /** es el nombre del role **/
    public nombreRole: string;

    /** son los modulos asociados a este ROLE */
    public modulos: Array<ModuloDTO>;
}