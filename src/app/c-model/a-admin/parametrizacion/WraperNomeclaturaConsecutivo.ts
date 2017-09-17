import { SI, NO } from './../../../z-util/Constants';
import { NomenclaturasConsecutivosVO } from './NomenclaturasConsecutivosVO';

/**
 * Clase wraper que contiene la nomeclatura de consecutivos de correspondencia, 
 * dado que que las banderas se deben utilizar con boolean y no con 1 y 0
 * 
 * @author Carlos Andres Diaz
 */
export class WraperNomeclaturaConsecutivo {

    /** contiene los datos de la nomenclatura **/
    public nomenclatura: NomenclaturasConsecutivosVO;
    
    /** 1 si la Fecha de elaboracion es editable de lo contrario 0 **/
    public fechaElaboracionEditableB: boolean;

    /** 1 si el campo (Elaborado Por) se debe diligenciar de lo contrario 0 **/
    public elaboradoPorVisibleB: boolean;

    /** 1 si el campo (Dirigido A) se debe diligenciar de lo contrario 0 **/
    public dirigidoAVisibleB: boolean;

    /** 1 si el campo (Asunto) se debe diligenciar de lo contrario 0 **/
    public asuntoVisibleB: boolean;

    /** 1 si el campo (Fecha SAC) se debe diligenciar de lo contrario 0 **/
    public fechaSacVisibleB: boolean;

    /** 1 si el campo (Nro SAC) se debe diligenciar de lo contrario 0 **/
    public nroSacVisibleB: boolean;
}