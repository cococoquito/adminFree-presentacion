import { ModuloItemDTO } from './../../../c-model/a-admin/seguridad/ModuloItemDTO';
import { ModuloDTO } from './../../../c-model/a-admin/seguridad/ModuloDTO';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para las parametrizaciones iniciales antes de que los usuarios
 * ejecuten algun proceso especifico en los modulos
 */
@Component({
    selector: 'app-parametrizaciones',
    templateUrl: './parametrizacion-registros.component.html'
})
export class ParametrizacionRegistrosComponent implements OnInit {

    /**Esta variable contiene los modulos a mostrar en el menu de parametrizacion*/
    public modulos: Array<ModuloDTO>;

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
     * @param item , es el ITEM que selecciono el usuario
     * @param modulo , es el MODULO que selecciono el usuario
     */
    private clicItem(item: ModuloItemDTO, modulo : ModuloDTO): void {
          for(let modulo of this.modulos){
              modulo.cerradoModulo = false;
              for(let item of modulo.itemsMenu){
                 item.seleccionado =false;
              }
          }

          item.seleccionado = true;
          modulo.cerradoModulo = true;

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

        // primer item para tipos de consecutivos correspondencia
        let item1 = new ModuloItemDTO();
        item1.nombreItem = "Tipos de Consecutivo de Correspondencia";
        items.push(item1);

        // segundo item para Series Documentales
        let item2 = new ModuloItemDTO();
        item2.nombreItem = "Series Documentales";
        items.push(item2);

        // tercer item para Funcionarios
        let item3 = new ModuloItemDTO();
        item3.nombreItem = "Funcionarios";
        items.push(item3);

        // cuarto item para Cargue de Consecutivos de Correspondencia
        let item4 = new ModuloItemDTO();
        item4.nombreItem = "Cargue de Consecutivos de Correspondencia";
        items.push(item4);

        // quinto item para Cierre de Anio
        let item5 = new ModuloItemDTO();
        item5.nombreItem = "Cierre de Año";
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
        items.push(item1);

        // item 2 para Destinos para Certificados Tiempo Servicios y Salarios
        let item2 = new ModuloItemDTO();
        item2.nombreItem = "Destinos para Certificados Tiempo Servicios y Salarios";
        items.push(item2);

        // item 3 para Destinos para Certificados Carta Laboral
        let item3 = new ModuloItemDTO();
        item3.nombreItem = "Destinos para Certificados Carta Laboral";
        items.push(item3);

        // item 4 para Grados de Escalafón del Docente
        let item4 = new ModuloItemDTO();
        item4.nombreItem = "Grados de Escalafón del Docente";
        items.push(item4);

        // item 5 para Tipos de Vinculación del Docente
        let item5 = new ModuloItemDTO();
        item5.nombreItem = "Tipos de Vinculación del Docente";
        items.push(item5);

        // item 6 para Tipos de Cargo del Docente
        let item6 = new ModuloItemDTO();
        item6.nombreItem = "Tipos de Cargo del Docente";
        items.push(item6);

        // item 7 para Instituciones Educativas
        let item7 = new ModuloItemDTO();
        item7.nombreItem = "Instituciones Educativas";
        items.push(item7);

        // item 8 para Configuración de Impresión para Certificados Solicitados
        let item8 = new ModuloItemDTO();
        item8.nombreItem = "Configuración de Impresión para Certificados Solicitados";
        items.push(item8);

        // item 9 para Cargue de Certificados Solicitados
        let item9 = new ModuloItemDTO();
        item9.nombreItem = "Cargue de Certificados Solicitados";
        items.push(item9);

        // item 10 para Cierre de Año
        let item10 = new ModuloItemDTO();
        item10.nombreItem = "Cierre de Año";
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
        items.push(item1);

        // segundo item para Tipos de Proceso
        let item2 = new ModuloItemDTO();
        item2.nombreItem = "Tipos de Proceso";
        items.push(item2);

        // tercer item para Despachos Judiciales
        let item3 = new ModuloItemDTO();
        item3.nombreItem = "Despachos Judiciales";
        items.push(item3);

        // cuarto item para Tipos del Caso
        let item4 = new ModuloItemDTO();
        item4.nombreItem = "Tipos del Caso";
        items.push(item4);
        return modulo;
    }
}