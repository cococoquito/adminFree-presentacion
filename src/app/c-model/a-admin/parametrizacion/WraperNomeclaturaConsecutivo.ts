import { SI, NO } from './../../../z-util/Constants';
import { NomenclaturasConsecutivosVO } from './NomenclaturasConsecutivosVO';

/**
 * Clase wraper que contiene la nomeclatura de consecutivos de correspondencia, 
 * dado que que las banderas se deben utilizar con boolean y no con 1 y 0
 * Esta clase solamente se utliza para angular
 * 
 * @author Carlos Andres Diaz
 */
export class WraperNomeclaturaConsecutivo {

    /** contiene los datos de la nomenclatura **/
    public nomenclaturaVO: NomenclaturasConsecutivosVO;

    /** contiene los datos de la nomenclatura origen se utiliza para la edicion **/
    public nomenclaturaOrigen: NomenclaturasConsecutivosVO;

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

    /** contiene la cantidad de campos visibles al momento de solicitar un consecutivo**/
    public cantCamposVisible: number;

    /**
     * Metodo que permite configurar las banderas de acuerdo al byte de visibilidad que tiene la nomenclatura
     */
    public configurarBanderas(): void {
        if (this.nomenclaturaVO) {

            // se inicializa con 1 dado que la fecha de elaboracion siempre es visible
            this.cantCamposVisible = 1;

            // campo fecha de elaboracion editable
            this.fechaElaboracionEditableB = false;
            if (this.nomenclaturaVO.fechaElaboracionEditable && this.nomenclaturaVO.fechaElaboracionEditable == SI) {
                this.fechaElaboracionEditableB = true;
            }

            // campo elaborado por visible
            this.elaboradoPorVisibleB = false;
            if (this.nomenclaturaVO.elaboradoPorVisible && this.nomenclaturaVO.elaboradoPorVisible == SI) {
                this.elaboradoPorVisibleB = true;
                this.cantCamposVisible++;
            }

            // campo dirigido A visible
            this.dirigidoAVisibleB = false;
            if (this.nomenclaturaVO.dirigidoAVisible && this.nomenclaturaVO.dirigidoAVisible == SI) {
                this.dirigidoAVisibleB = true;
                this.cantCamposVisible++;
            }

            // campo asunto visible
            this.asuntoVisibleB = false;
            if (this.nomenclaturaVO.asuntoVisible && this.nomenclaturaVO.asuntoVisible == SI) {
                this.asuntoVisibleB = true;
                this.cantCamposVisible++;
            }

            // campo fecha SAC visible
            this.fechaSacVisibleB = false;
            if (this.nomenclaturaVO.fechaSacVisible && this.nomenclaturaVO.fechaSacVisible == SI) {
                this.fechaSacVisibleB = true;
                this.cantCamposVisible++;
            }

            // campo numero SAC visible
            this.nroSacVisibleB = false;
            if (this.nomenclaturaVO.nroSacVisible && this.nomenclaturaVO.nroSacVisible == SI) {
                this.nroSacVisibleB = true;
                this.cantCamposVisible++;
            }
        }
    }

    /**
     * Metodo que permite configurar los bytes de visibilidad que tiene la nomenclatura
     */
    public configurarByteVisibilidad(): void {
        if (this.nomenclaturaVO) {

            // campo Fecha de elaboracion editable
            this.nomenclaturaVO.fechaElaboracionEditable = NO;
            if (this.fechaElaboracionEditableB) {
                this.nomenclaturaVO.fechaElaboracionEditable = SI;
            }

            // campo Elaborado Por visible
            this.nomenclaturaVO.elaboradoPorVisible = NO;
            if (this.elaboradoPorVisibleB) {
                this.nomenclaturaVO.elaboradoPorVisible = SI;
            }

            // campo dirigido A visible
            this.nomenclaturaVO.dirigidoAVisible = NO;
            if (this.dirigidoAVisibleB) {
                this.nomenclaturaVO.dirigidoAVisible = SI;
            }

            // campo Asunto visible
            this.nomenclaturaVO.asuntoVisible = NO;
            if (this.asuntoVisibleB) {
                this.nomenclaturaVO.asuntoVisible = SI;
            }

            // campo Fecha SAC visible
            this.nomenclaturaVO.fechaSacVisible = NO;
            if (this.fechaSacVisibleB) {
                this.nomenclaturaVO.fechaSacVisible = SI;
            }

            // numero SAC visible
            this.nomenclaturaVO.nroSacVisible = NO;
            if (this.nroSacVisibleB) {
                this.nomenclaturaVO.nroSacVisible = SI;
            }
        }
    }
}