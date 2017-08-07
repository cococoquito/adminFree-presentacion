import { UsuariosVO } from './UsuariosVO';

/**
 * DTO que contiene los datos para el cambio de clave
 * 
 * @author Carlos Andres Diaz
 */
export class CambioClaveDTO {

    /** representa el identificador del user autenticado **/
    public idUsuario: number;

    /** propiedad que representa la clave actual */
    public claveActual: string;

    /** propiedad que representa la clave nueva */
    public claveNueva: string;

    /** propiedad que representa la clave nueva repetida */
    public repetirClaveNueva: string;
}