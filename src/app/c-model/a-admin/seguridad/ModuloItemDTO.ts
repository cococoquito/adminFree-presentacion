import { PrivilegioEspecificoDTO } from './PrivilegioEspecificoDTO';

/**
 * DTO que contiene las propiedades de cada ITEM
 * 
 * @author Carlos Andres Diaz
 */
export class ModuloItemDTO {

    /** Identificador del item */
    public idItem: number;

    /** nombre del item */
    public nombreItem: string;

	/** dscripcion del item */
	private descripcion: string;    

    /** URL del router para el redireccionamiento */
    public urlRouter: string;

    /** bandera que indica si el registro fue seleccionado **/
    public seleccionado: boolean;

    /** Lista privilegios especifico que tiene este items */
    public privilegiosEspecificosDTO: Array<PrivilegioEspecificoDTO>;
}