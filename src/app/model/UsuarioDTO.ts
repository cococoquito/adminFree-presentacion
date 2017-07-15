/**
 * DTO que representa los datos de los usuario del APP
 */
export class UsuarioDTO {

    /** identificador del user */
    id: number;

    /** propiedad que representa el nombre del user */
    nombre: string;

    /** propiedad que representa el valor del usuario para la autenticacion */
    usuario: string;

    /** propiedad que representa la clave del user */
    clave: string;
}
