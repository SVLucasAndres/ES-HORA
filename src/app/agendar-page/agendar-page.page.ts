import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Browser } from '@capacitor/browser';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Timestamp, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-agendar-page',
  templateUrl: './agendar-page.page.html',
  styleUrls: ['./agendar-page.page.scss'],
})
export class AgendarPagePage implements OnInit {
  
  async ngOnInit() {
    await this.storage.create();
    this.hora();
  }
  fechaHoraFormateada:any;
  async hora(){
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const horaFormateada = fecha.toLocaleTimeString('es-EC', { hour12: false });
    this.fechaHoraFormateada = await `${fechaFormateada}T${horaFormateada}`;
  }
  formData = {
    logoCom:"https://ionicframework.com/docs/img/demos/thumbnail.svg",
    comando:"",
    fecha:"",
    color:""
  }
  botonHabilitado: boolean = false;
  actualizarEstadoBoton() {
    this.botonHabilitado = this.formData.logoCom !== '' && this.formData.comando !== ''&& this.formData.fecha !== null && this.formData.color!=='';
    if(this.formData.comando == "Comer"){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/comer.jpg?alt=media&token=b66b1f25-e03b-4874-a9a9-f6cc9dc58235';
    }else if(this.formData.comando == 'Asearse'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/ba%C3%B1o.jpg?alt=media&token=df71944a-f2b4-43ce-b18f-38f0ca2e1499';
    }else if(this.formData.comando == 'Motricidad'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/motricidad.jpg?alt=media&token=1d0617ae-ba01-4e99-a354-06e2f49b1a84';
    }else if(this.formData.comando == 'Comunicacion'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/comunicaci%C3%B3n.jpg?alt=media&token=e4c652c8-c93e-4189-94bf-e94eeadb878b';
    }else if(this.formData.comando == 'Emociones'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/emociones.jpg?alt=media&token=cfba0982-794f-4e69-bddd-794681ad7f46';
    }else if(this.formData.comando == 'Clima'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/clima.jpg?alt=media&token=a0319ba5-cf08-4736-8433-0afc45215d96';
    }else if(this.formData.comando == 'Cantar'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/cantar.jpg?alt=media&token=70b55308-d972-4ea1-abcf-350806f011b6';
    }else if(this.formData.comando == 'Casa'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/casa.jpg?alt=media&token=10a0ebbb-2c25-4eb2-ba72-2bc9920b92df';
    }else if(this.formData.comando == 'Recreo'){
      this.formData.logoCom = 'https://firebasestorage.googleapis.com/v0/b/carlatesis-1d7aa.appspot.com/o/recreo.jpg?alt=media&token=879c3687-f610-4043-a3eb-36f5be070f7b';
    }
  }
  constructor(private alertController:AlertController,private db:Firestore, private storage:Storage) {}
 
  ruta:any;
  id:any;
  async agregarTarea(){
    try{
      const usuarios = await this.storage.get("User");
    const number = usuarios + this.formData.comando + this.formData.fecha;
    const fechaHoraLocal = new Date(this.formData.fecha);
    const fechaHoraUTC = new Date(fechaHoraLocal.toUTCString());
    const fechaHoraFirestore = Timestamp.fromDate(fechaHoraUTC);
    const poscoma = this.formData.color.indexOf(",");
    const posdoblecoma = this.formData.color.indexOf(",,");
    this.ruta = doc(this.db,'Tareas', number);
    await setDoc(this.ruta, { id: number, logoCom:this.formData.logoCom, r:this.formData.color.substring(0,poscoma),g:this.formData.color.substring(poscoma+1,posdoblecoma),b:this.formData.color.substring(posdoblecoma+2), comando:this.formData.comando, fecha: fechaHoraFirestore, usuario: usuarios});
    }catch(err){
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Comprueba tu conexión a internet',
          message: 'Error'+err,
          buttons: ['OK'],
        });
    
        await alert.present();
      
    }
   }
  
}
interface FormData {
  logoCom: string;
  comando: string;
  fecha: Date; // fecha puede ser Timestamp o null
  color: string;
}