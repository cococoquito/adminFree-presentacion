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

    private crearTipoConsecutivo : boolean=false;

    private camposIngreso:Array<CampoTipoCC>;

    /**
     * PostConstructor que permite inicializar las variables del component
     */
    ngOnInit(): void { 
        
        let fechaElaboracion = new CampoTipoCC();
        fechaElaboracion.nombreCampo ="Fecha de Elaboración";
        fechaElaboracion.descripcionCampo = "Es la fecha del dia que elaboro el oficio dando respuesta, el sistema toma asigna la fecha actual si el campo es editable el funcionario podrá cambiar este valor";
        fechaElaboracion.visible=true;
        fechaElaboracion.id =1;

        let elaboradoPor = new CampoTipoCC();
        elaboradoPor.nombreCampo ="Elaborado por";
        elaboradoPor.descripcionCampo = "Corresponde al nombre del funcionario el cual va a elaborar el oficio de respuesta";
        elaboradoPor.visible=true;
        elaboradoPor.id =2;

        let dirigido = new CampoTipoCC();
        dirigido.nombreCampo ="Dirigido a";
        dirigido.descripcionCampo = "Corresponde al nombre de la entidad o el nombre de la persona que escribe a la secretaría";        
        dirigido.visible=true;
        dirigido.id =3;

        let asunto = new CampoTipoCC();
        asunto.nombreCampo ="Asunto";
        asunto.descripcionCampo = "es un pequeño resumen donde se dice que solicita el ciudadano u organización";     
        asunto.visible=true; 
        asunto.id =4;       

        let fechaSAC=new CampoTipoCC();
        fechaSAC.nombreCampo ="Fecha del SAC";
        fechaSAC.descripcionCampo = "Corresponde a la fecha del recibido que se hace una vez ingresado o radicado la solicitud de un ciudadano u organización";
        fechaSAC.visible=true;  
        fechaSAC.id =5;

        let nroSAC=new CampoTipoCC();
        nroSAC.nombreCampo ="Nro del SAC";
        nroSAC.descripcionCampo = "la Secretaría de Educación Municipal de Armenia, actualmente cuenta con una aplicación donde se radican toda la correspondencia (oficios) que ingresa a la entidad, y el cual asigna un numero de radicado con lo que se identifica el documento.";        
        nroSAC.visible=true; 
        nroSAC.id =6;

        this.camposIngreso = new Array<CampoTipoCC>();
        this.camposIngreso.push(fechaElaboracion);
        this.camposIngreso.push(elaboradoPor);
        this.camposIngreso.push(dirigido);
        this.camposIngreso.push(asunto);
        this.camposIngreso.push(fechaSAC);
        this.camposIngreso.push(nroSAC);

    }

    private crearTipoConsecutivoCorrespondencia():void {
        this.crearTipoConsecutivo = true;
    }

    private cancelarCreacionTipoConsecutivo():void{
        this.crearTipoConsecutivo = false;
    }
}