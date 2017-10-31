import { AlertService } from './../b-service/z-common/alert.service';
import { UtilitarioService } from './../b-service/z-common/utilitario.service';
import { SELECT_VALUE_DEFAULT_NUMBER, STYLE_ERROR_CENTER } from './Constants';

/**
 * Todos los componentes del sistema heredan de esta clase, donde contiene las funcionalidades comunes
 */
export class ComponentCommon {

    /** propiedad que contiene el valor por default para los select aplica solo number*/
    protected selectValueDefaultNumber: number;

    /** bandera que identifica si ya se hizo submit */
    protected submitted: boolean;

    /**
    * Constructor del componente common
    * @param utilService, service con las funciones utilitarias
    * @param alertService, service para la comunicacion del componente de mensaje de alerta
    */
    constructor(
        protected utilService: UtilitarioService,
        protected alertService: AlertService) {

        // se configura el value por default de los select items
        this.selectValueDefaultNumber = SELECT_VALUE_DEFAULT_NUMBER;
    }

    /**
     * Metodo que permite establecer que el user ya hizo submitted
     */
    protected onSubmit(): boolean {

        // se oculta el alert esto por si hay errores con el submit anterior
        this.alertService.hiddenAlert();

        // se notifica que el user hizo submitted
        this.submitted = true;
        return this.submitted;
    }

    /**
     * metodo que permite mostrar el error ocacionado por el sistema
     * @param error, es el error a mostrar en el alert
     */
    public showErrorSistema(error): void {

        // se muestra el mensaje alert danger
        this.alertService.showAlert(error.text(), STYLE_ERROR_CENTER, false);

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
    }

    /**
     * Metodo que permite soportar el evento click del componente
     * input switch del sistema
     * @param object , este objecto debe contener la bandera seleccionado
     * @param typeAtribute, identifica el tipo de atributo a configurar
     */
    private clickInputSwitch(object: any, typeAtribute: number): void {
        
        // nombre del atributo "seleccionado"
        if (typeAtribute == 1) {
            object.seleccionado = (object.seleccionado) ? false : true;
        } 
        
        // nombre del atributo "fechaElaboracionEditableB"
        else if (typeAtribute == 2) {
            object.fechaElaboracionEditableB = (object.fechaElaboracionEditableB) ? false : true;
        } 
        
        // nombre del atributo "elaboradoPorVisibleB"
        else if (typeAtribute == 3) {
            object.elaboradoPorVisibleB = (object.elaboradoPorVisibleB) ? false : true;
        }
        
        // nombre del atributo "dirigidoAVisibleB"
        else if (typeAtribute == 4) {
            object.dirigidoAVisibleB = (object.dirigidoAVisibleB) ? false : true;
        } 
        
        // nombre del atributo "asuntoVisibleB"
        else if (typeAtribute == 5) {
            object.asuntoVisibleB = (object.asuntoVisibleB) ? false : true;
        } 
        
        // nombre del atributo "fechaSacVisibleB"
        else if (typeAtribute == 6) {
            object.fechaSacVisibleB = (object.fechaSacVisibleB) ? false : true;
        } 
        
        // nombre del atributo "nroSacVisibleB"
        else if (typeAtribute == 7) {
            object.nroSacVisibleB = (object.nroSacVisibleB) ? false : true;
        }
    }
}