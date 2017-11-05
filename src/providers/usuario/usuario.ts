import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
@Injectable()
export class UsuarioService {
  clave:string;

  constructor( private afdb:AngularFireDatabase,
               private storage:Storage,
               private platform:Platform ) {

    console.log('Hello UsurioProvider Provider');

  }

  verifica_usuario( clave:string ){
    clave = clave.toLowerCase();

    let promesa=new Promise( (resolve, reject)=>{
       this.afdb.list("/usuarios/"+clave).valueChanges()
                .subscribe( data=>{
                  if(data.length === 0){
                    //clave incorrecta
                    resolve(false);
                  }
                  else{
                    //clave correcta
                    this.clave=clave;
                    this.guardar_storage();
                    resolve(true);
                  }
                });
     } ).catch(error=> console.log("Error en la promesa service: "+JSON.stringify(error)));

     return promesa;
  }

  guardar_storage(){
    let promesa = new Promise( (resolve, reject)=>{
      if(this.platform.is("cordova")){
        this.storage.set("clave",this.clave);
      }
      else{
        if( this.clave ){
            localStorage.setItem("clave",this.clave);
        }
        else{
          localStorage.removeItem("clave");
        }
      }
    } );
  }

  cargar_storage(){
    let promesa= new Promise( (resolve, reject)=>{
      if(this.platform.is("cordova")){
        this.storage.ready()
            .then(()=>{
              this.storage.get("clave").then(clave=>{
                this.clave=clave;
                resolve();
              });
            });
      }
      else{
        this.clave=localStorage.getItem("clave");
        resolve();
      }
    });

    return promesa;
  }



}
