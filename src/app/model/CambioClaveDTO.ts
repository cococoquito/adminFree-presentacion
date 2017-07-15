import { UsuarioDTO } from './UsuarioDTO';
/**
 * DTO que contiene los datos para el cambio de clave
 */
export class CambioClaveDTO {

    /** propiedad que representa la clave actual */
    claveActual: string;

    /** propiedad que representa la clave nueva */
    claveNueva: string;

    /** propiedad que representa la clave nueva repetida */
    repetirClaveNueva: string;

    /** usuario a quien se le cambia la clave */
    usuario: UsuarioDTO;
}