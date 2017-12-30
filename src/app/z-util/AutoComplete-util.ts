import { CommonVO } from './../c-model/a-admin/parametrizacion/CommonVO';

/**
 * Contiene toda la logica para el funcionamiento correcto de un componente autocomplete,
 * Esta utilidad solamente aplica para items que ya se encuentran consultados
 */
export class AutocompleteUtil {

    /**
     * Es el id del input del autocomplete, si este valor es null quiere decir 
     * que el "inputDIV" es el input, y no hay necesidad de buscarlo
     **/
    public inputID: string

    /** Es el input del autocomplete o el DIV que lo contiene**/
    public inputDIV: any;

    /** Son todos los items a mostrar en el componente**/
    public items: CommonVO[];

    /** Son todos los items filtrados de acuerdo al valor ingresado**/
    public itemsFilter: string[];

    /** Es el item seleccionado por el usuario**/
    public itemSeleccionado: CommonVO;

    /** Es el valor ingresado por el usuario en el componente autocomplete**/
    public valor: string;

    /** Es el input del autocomplete para configurar el focus**/
    private autocomplete: any;

    /**
     * Metodo que se ejecuta cuando van ingresando valores en el componente
     * donde se consultan los valores que coincidan con el valor ingresado
     * @param event , evento que se ejecuta desde la pantalla
     */
    public dropDownSearch(event): void {
        this.itemsFilter = [];
        if (this.items) {
            for (let item of this.items) {
                if (item.nombre.toLowerCase().indexOf(event.query.toLowerCase()) >= 0) {
                    this.itemsFilter.push(item.nombre);
                }
            }
        }
    }

    /**
     * Metodo que es ejecutado cuando el componente pierde el focus
     */
    public dropDownOnblur(event): void {
        // se limpia el item seleccionado
        this.itemSeleccionado = null;

        // se valida que el valor ingresado no sea nulo
        if (this.valor) {

            // se hace la copia del valor ingresado
            let valorCopia = this.valor;

            // se limpia el valor ingresado
            this.valor = null;

            // se recorre la lista de items para verificar si hay algun
            // valor que coincida con la copia del valor ingresado
            if (this.items) {
                for (let item of this.items) {
                    if (valorCopia == item.nombre) {

                        // se configuran los valores del item encontrado
                        this.valor = valorCopia;
                        this.itemSeleccionado = item;
                        return;
                    }
                }

                // se busca el input del autocomplete
                this.findAutocompleteComponent();

                // se configura el focus en el input del autocomplete
                this.setFocusAutocomplete();
            }
        }
    }

    /**
     * Metodo que permite buscar el input del componente autocomplete dentro del DOM
     */
    private findAutocompleteComponent(): void {
        // se valida si el input ya fue encontrado
        if (!this.autocomplete) {

            // si este valor es null quiere decir que el "inputDIV" es el input, y no hay necesidad de buscarlo
            if (this.inputID) {

                // se valida que si esiste el DIV dentro del DOM
                if (this.inputDIV && 
                    this.inputDIV.nativeElement && 
                    this.inputDIV.nativeElement.childNodes) {

                    // se recorre todos los hijos del DIV
                    for (var i = 0; i < this.inputDIV.nativeElement.childNodes[1].length; i++) {

                        // se obtiene cada componente del DIV
                        let field = this.inputDIV.nativeElement.childNodes[1][i];

                        // se valida si este componente es el mismo del id del input
                        if (field && this.inputID == field.id) {
                            this.autocomplete = field;
                            return;
                        }

                    }
                }
            } else {
                this.autocomplete = this.inputDIV;
            }
        }
    }

    /**
     * Metodo que permite configurar el focus para el autocomplete
     */
    private setFocusAutocomplete(): void {
        setTimeout(() => {
            if (this.autocomplete) {

                // si el input ID NO es NULL significa que el autocomplete es el <input>
                if (this.inputID) {
                    this.autocomplete.focus();
                } else {
                    // si el input ID es NULL significa que el autocomplete es el <p-autoComplete>
                    this.autocomplete.inputEL.nativeElement.focus();
                }
            }
        }, 100)
    }
}