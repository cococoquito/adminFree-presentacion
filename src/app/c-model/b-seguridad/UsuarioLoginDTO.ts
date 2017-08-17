import { RoleDTO } from './../a-admin/seguridad/RoleDTO';
import { UsuariosVO } from './UsuariosVO';

/**
 *  DTO que contiene las propiedades del usuario para la autenticacion
 * 
 * @author Carlos Andres Diaz
 */
export class UsuarioLoginDTO {

    /** Objecto que contiene el usuario autenticado en el sistema */
    public usuario: UsuariosVO;

    /** es el ROL asociado al usuario */
    public rol: RoleDTO;
}