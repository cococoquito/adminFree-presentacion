/**
 * VO que representa los datos de los usuario del APP
 * 
 * @author Carlos Andres Diaz
 */
export class UsuariosVO {

    /** identificador del user */
    public idUsuario: number;

    /** propiedad que representa el nombre del user */
    public nombre: string;

    /** propiedad que representa el user para la autenticacion */
    public nombreUsuario: string;

    /** propiedad que representa la clave del user */
    public claveIngreso: string;

    /** propiedad que identifica si el user es abogado, 1=true */
    public esAbogado: number;
}