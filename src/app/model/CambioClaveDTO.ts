import { UsuariosVO } from './UsuariosVO';

/**
 * DTO que contiene los datos para el cambio de clave
 */
export class CambioClaveDTO {

    /** representa el identificador del user autenticado **/
    idUsuario: number;

    /** propiedad que representa la clave actual */
    claveActual: string;

    /** propiedad que representa la clave nueva */
    claveNueva: string;

    /** propiedad que representa la clave nueva repetida */
    repetirClaveNueva: string;
}