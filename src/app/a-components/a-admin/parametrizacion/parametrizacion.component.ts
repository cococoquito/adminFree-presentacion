import { ModuloItemDTO } from './../../../c-model/a-admin/seguridad/ModuloItemDTO';
import { ModuloDTO } from './../../../c-model/a-admin/seguridad/ModuloDTO';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para las parametrizaciones iniciales antes de que los usuarios
 * ejecuten algun proceso especifico en los modulos
 */
@Component({
    selector: 'app-parametrizaciones',
    templateUrl: './parametrizacion.component.html'
})
export class ParametrizacionComponent implements OnInit {

    /** Constantes para los identificadores de los items de correspondencia */
    private CORRESPONDENCIA_ITEM1: number = 1;
    private CORRESPONDENCIA_ITEM3: number = 3;
    private CORRESPONDENCIA_ITEM4: number = 4;
    private CORRESPONDENCIA_ITEM5: number = 5;

    /** Constantes para los identificadores de los items de solicitud certificados */
    private SOLICITUD_CERTIFICADO_ITEM1: number = 6;
    private SOLICITUD_CERTIFICADO_ITEM2: number = 7;
    private SOLICITUD_CERTIFICADO_ITEM3: number = 8;
    private SOLICITUD_CERTIFICADO_ITEM4: number = 9;
    private SOLICITUD_CERTIFICADO_ITEM5: number = 10;
    private SOLICITUD_CERTIFICADO_ITEM6: number = 11;
    private SOLICITUD_CERTIFICADO_ITEM7: number = 12;
    private SOLICITUD_CERTIFICADO_ITEM8: number = 13;
    private SOLICITUD_CERTIFICADO_ITEM9: number = 14;
    private SOLICITUD_CERTIFICADO_ITEM10: number = 15;

    /** Constantes para los identificadores de los items DEMANDAS */
    private DEMANDAS_ITEM1: number = 16;
    private DEMANDAS_ITEM2: number = 17;
    private DEMANDAS_ITEM3: number = 18;
    private DEMANDAS_ITEM4: number = 19;

    /**Esta variable contiene los modulos a mostrar en el menu de parametrizacion*/
    private modulos: Array<ModuloDTO>;

    /**Representa el item seleccionado por el usuario*/
    private itemSeleccionado: ModuloItemDTO;

    /**Representa el modulo del item seleccionado por el usuario*/
    private moduloSeleccionado: ModuloDTO

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {

        // se configura los modulos a mostrar en el menu
        this.modulos = new Array<ModuloDTO>();

        // se configura los items para consecutivos de correspondencia
        this.modulos.push(this.getModuloCorrespondencia());

        // se configura los items para solicitud de certificados
        this.modulos.push(this.getModuloSolicitudCertificados());

        // se configura los items para el modulo demandas
        this.modulos.push(this.getModuloDemanda());
    }

    /**
     * Metodo que permite soportar el evento clic de un item del menu
     * @param item , es el ITEM seleccionado por el usuario
     * @param modulo , es el MODULO asociado al item seleccionado por el usuario
     */
    private clicItem(item: ModuloItemDTO, modulo: ModuloDTO): void {

        // se recorre todos los modulos para habilitar el item seleccionado con anterioridad        
        for (let modulo of this.modulos) {
            modulo.cerradoModulo = false;
            for (let item of modulo.itemsMenu) {
                item.seleccionado = false;
            }
        }

        // se configura el modulo e item como seleccionado
        item.seleccionado = true;
        modulo.cerradoModulo = true;

        // se configura el item y el modulo seleccionado
        this.itemSeleccionado = item;
        this.moduloSeleccionado = modulo;
    }

    /**
     * Metodo que permite construir los items parametricos para el modulo de correspondencia
     */
    private getModuloCorrespondencia(): ModuloDTO {

        // se configura el modulo de correspondencia
        let modulo = new ModuloDTO();
        modulo.nombreModulo = "Correspondencia";
        modulo.idModulo = 1;

        // se configura los items para el modulo correspondencia
        let items = Array<ModuloItemDTO>();
        modulo.itemsMenu = items;

        // primer item para las nomenclatura de correspondencia
        let item1 = new ModuloItemDTO();
        item1.nombreItem = "Nomenclaturas de Correspondencia";
        item1.idItem = this.CORRESPONDENCIA_ITEM1;
        items.push(item1);

        // tercer item para Funcionarios
        let item3 = new ModuloItemDTO();
        item3.nombreItem = "Funcionarios";
        item3.idItem = this.CORRESPONDENCIA_ITEM3;
        items.push(item3);

        // cuarto item para Cargue de Consecutivos de Correspondencia
        let item4 = new ModuloItemDTO();
        item4.nombreItem = "Cargue de Consecutivos de Correspondencia";
        item4.idItem = this.CORRESPONDENCIA_ITEM4;
        items.push(item4);

        // quinto item para Cierre de Anio
        let item5 = new ModuloItemDTO();
        item5.nombreItem = "Cierre de Año";
        item5.idItem = this.CORRESPONDENCIA_ITEM5;
        items.push(item5);
        return modulo;
    }

    /**
     * Metodo que permite construir los items parametricos para el modulo de solicitud de certificados
     */
    private getModuloSolicitudCertificados(): ModuloDTO {

        // se configura el modulo de solicitud de certificados
        let modulo = new ModuloDTO();
        modulo.nombreModulo = "Solicitud Certificados";
        modulo.idModulo = 2;

        // se configura los items para el modulo de solicitud de certificados
        let items = Array<ModuloItemDTO>();
        modulo.itemsMenu = items;

        // item 1 para Tipos de Solicitud para Certificados Tiempo Servicios y Salarios
        let item1 = new ModuloItemDTO();
        item1.nombreItem = "Tipos de Solicitud para Certificados Tiempo Servicios y Salarios";
        item1.idItem = this.SOLICITUD_CERTIFICADO_ITEM1;
        items.push(item1);

        // item 2 para Destinos para Certificados Tiempo Servicios y Salarios
        let item2 = new ModuloItemDTO();
        item2.nombreItem = "Destinos para Certificados Tiempo Servicios y Salarios";
        item2.idItem = this.SOLICITUD_CERTIFICADO_ITEM2;
        items.push(item2);

        // item 3 para Destinos para Certificados Carta Laboral
        let item3 = new ModuloItemDTO();
        item3.nombreItem = "Destinos para Certificados Carta Laboral";
        item3.idItem = this.SOLICITUD_CERTIFICADO_ITEM3;
        items.push(item3);

        // item 4 para Grados de Escalafón del Docente
        let item4 = new ModuloItemDTO();
        item4.nombreItem = "Grados de Escalafón del Docente";
        item4.idItem = this.SOLICITUD_CERTIFICADO_ITEM4;
        items.push(item4);

        // item 5 para Tipos de Vinculación del Docente
        let item5 = new ModuloItemDTO();
        item5.nombreItem = "Tipos de Vinculación del Docente";
        item5.idItem = this.SOLICITUD_CERTIFICADO_ITEM5;
        items.push(item5);

        // item 6 para Tipos de Cargo del Docente
        let item6 = new ModuloItemDTO();
        item6.nombreItem = "Tipos de Cargo del Docente";
        item6.idItem = this.SOLICITUD_CERTIFICADO_ITEM6;
        items.push(item6);

        // item 7 para Instituciones Educativas
        let item7 = new ModuloItemDTO();
        item7.nombreItem = "Instituciones Educativas";
        item7.idItem = this.SOLICITUD_CERTIFICADO_ITEM7;
        items.push(item7);

        // item 8 para Configuración de Impresión para Certificados Solicitados
        let item8 = new ModuloItemDTO();
        item8.nombreItem = "Configuración de Impresión para Certificados Solicitados";
        item8.idItem = this.SOLICITUD_CERTIFICADO_ITEM8;
        items.push(item8);

        // item 9 para Cargue de Certificados Solicitados
        let item9 = new ModuloItemDTO();
        item9.nombreItem = "Cargue de Certificados Solicitados";
        item9.idItem = this.SOLICITUD_CERTIFICADO_ITEM9;
        items.push(item9);

        // item 10 para Cierre de Año
        let item10 = new ModuloItemDTO();
        item10.nombreItem = "Cierre de Año";
        item10.idItem = this.SOLICITUD_CERTIFICADO_ITEM10;
        items.push(item10);
        return modulo;
    }

    /**
     * Metodo que permite construir los items parametricos para el modulo Demandas
     */
    private getModuloDemanda(): ModuloDTO {

        // se configura el modulo Demandas
        let modulo = new ModuloDTO();
        modulo.nombreModulo = "Demandas";
        modulo.idModulo = 3;

        // se configura los items para el modulo Demandas
        let items = Array<ModuloItemDTO>();
        modulo.itemsMenu = items;

        // primer item para demandados
        let item1 = new ModuloItemDTO();
        item1.nombreItem = "Demandados";
        item1.idItem = this.DEMANDAS_ITEM1;
        items.push(item1);

        // segundo item para Tipos de Proceso
        let item2 = new ModuloItemDTO();
        item2.nombreItem = "Tipos de Proceso";
        item2.idItem = this.DEMANDAS_ITEM2;
        items.push(item2);

        // tercer item para Despachos Judiciales
        let item3 = new ModuloItemDTO();
        item3.nombreItem = "Despachos Judiciales";
        item3.idItem = this.DEMANDAS_ITEM3;
        items.push(item3);

        // cuarto item para Tipos del Caso
        let item4 = new ModuloItemDTO();
        item4.nombreItem = "Tipos del Caso";
        item4.idItem = this.DEMANDAS_ITEM4;
        items.push(item4);
        return modulo;
    }
}