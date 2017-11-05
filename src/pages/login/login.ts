import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario/usuario';
import { HomePage } from  '../home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;
  clave:string="lmmc-1";

  constructor( public navCtrl: NavController, private _us: UsuarioService, private loadingCtrl:LoadingController, private alertCtrl:AlertController ) {

  }

  continuar(){
    //verificar si la clave es valida
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });

    loading.present();

    this._us.verifica_usuario( this.clave )
            .then(valido=>{
                loading.dismiss();

                if(valido){
                  //deslizar el slides
                  this.slides.lockSwipes(false);
                  this.slides.slideNext();
                  this.slides.lockSwipes(true);
                }
                else{
                  this.alertCtrl.create({
                    title: "Clave es incorrecta",
                    subTitle: "Verifiqque su contraseña",
                    buttons: ["Ok!"]
                  }).present();
                }

            })
            .catch( error=>{
              loading.dismiss();
              console.log("Error: "+JSON.stringify( error ))
            });
  }

  ingresar(){
    //ir al home
    this.navCtrl.setRoot(HomePage);

  }

  ngAfterViewInit(){

    this.slides.lockSwipes(true);//to block the slides
    this.slides.freeMode=false;
    this.slides.paginationType="progress";

  }

}
