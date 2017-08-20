
/**
 * DTO que contiene las propiedades del usuario ACTIVO
 * 
 * @author Carlos Andres Diaz
 */
export class UsuariosDTO {

    /** representa el identificador del usuario **/
    public idUsuario: number;

    /** representa el nombre del usuario **/
    public nombre: string;

	/** representa el nombre Usuario del para seguridad del user **/
	public nombreUsuario: string;    

    /** representa el identificador del ROL del usuario **/
    public roles: number;

    /** 1= si el usuario es abogado **/
    public esAbogado: number;

    /** representa el nombre del ROL del usuario **/
    public nombreRole: string;
}