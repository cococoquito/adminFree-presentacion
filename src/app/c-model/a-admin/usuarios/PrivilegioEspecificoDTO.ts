/**
 * DTO que contiene los privilegios especificos de cada ITEM
 * 
 * @author Carlos Andres Diaz
 */
export class PrivilegioEspecificoDTO {

    /** bandera que indica si el registro fue seleccionado **/
    public seleccionado: boolean;

    /** representa el tipo de privilegio, 1,2,3 **/
    public tipoPrivilegio: number;
}