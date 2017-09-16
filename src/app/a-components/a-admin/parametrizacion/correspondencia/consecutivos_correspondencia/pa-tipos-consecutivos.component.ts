import { CampoTipoCC } from './../../../../../c-model/a-admin/parametrizacion/CampoTipoCC';
import { ModuloItemDTO } from './../../../../../c-model/a-admin/seguridad/ModuloItemDTO';
import { ModuloDTO } from './../../../../../c-model/a-admin/seguridad/ModuloDTO';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Componente para las parametrizaciones de los tipos de consecutivos de correspondencia
 */
@Component({
    selector: 'pa-tipos-consecutivos',
    templateUrl: './pa-tipos-consecutivos.component.html'
})
export class PaTiposConsecutivosComponent implements OnInit {

    /** Es el item seleccionado por el usuario*/
    @Input()
    public item: ModuloItemDTO;

    /** Es el modulo del item seleccionado por el usuario*/
    @Input()
    public modulo: ModuloDTO;

    /** lista de campos para identificar si se deben digilenciar al momento de solicar el consecutivo*/
    private camposIngreso: Array<CampoTipoCC>;

    private crearTipoConsecutivo: boolean = false;

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void {

        // se configuran los campos a visualizar por pantalla
        this.configurarCamposDigilenciar();
    }

    /**
     * Metodo que permite abrir el panel de creacion de consecutivo
     */
    private abrirPanelCreacion(): void {
        this.crearTipoConsecutivo = true;
    }

    /**
     * Metodo que permite cerrar el panel de creacion de consecutivo
     */
    private cerrarPanelCreacion(): void {
        this.crearTipoConsecutivo = false;
    }

    /**
     * Metodo que permite configurar los campos a visualizar por pantalla
     */
    private configurarCamposDigilenciar(): void {

        // fecha de elaboracion
        let fechaElaboracion = new CampoTipoCC();
        fechaElaboracion.nombreCampo = "Fecha de Elaboración";
        fechaElaboracion.descripcionCampo = "Fecha de elaboración del documento de respuesta, El sistema asigna la fecha actual por defecto";
        fechaElaboracion.diligenciar = true;
        fechaElaboracion.id = 1;

        // Elaborado Por
        let elaboradoPor = new CampoTipoCC();
        elaboradoPor.nombreCampo = "Elaborado Por";
        elaboradoPor.descripcionCampo = "Nombre del funcionario quien elabora el documento de respuesta";
        elaboradoPor.diligenciar = true;
        elaboradoPor.id = 2;

        // Dirigido A
        let dirigido = new CampoTipoCC();
        dirigido.nombreCampo = "Dirigido A";
        dirigido.descripcionCampo = "Nombre de la entidad o ciudadano a quien se va dirigir el documento de respuesta";
        dirigido.diligenciar = true;
        dirigido.id = 3;

        // Asunto
        let asunto = new CampoTipoCC();
        asunto.nombreCampo = "Asunto";
        asunto.descripcionCampo = "Breve resumen donde se especifica lo que solicita la entidad o el ciudadano";
        asunto.diligenciar = true;
        asunto.id = 4;

        // Fecha del SAC
        let fechaSAC = new CampoTipoCC();
        fechaSAC.nombreCampo = "Fecha del SAC";
        fechaSAC.descripcionCampo = "Fecha en la que el SAC recibió o radicó la solicitud de la entidad o ciudadano";
        fechaSAC.diligenciar = true;
        fechaSAC.id = 5;

        // Numero del SAC
        let nroSAC = new CampoTipoCC();
        nroSAC.nombreCampo = "Número del SAC";
        nroSAC.descripcionCampo = "Número que asigna el SAC para identificar la solicitud de la entidad o ciudadano";
        nroSAC.diligenciar = true;
        nroSAC.id = 6;

        // se agregan los campos
        this.camposIngreso = new Array<CampoTipoCC>();
        this.camposIngreso.push(fechaElaboracion);
        this.camposIngreso.push(elaboradoPor);
        this.camposIngreso.push(dirigido);
        this.camposIngreso.push(asunto);
        this.camposIngreso.push(fechaSAC);
        this.camposIngreso.push(nroSAC);
    }
}