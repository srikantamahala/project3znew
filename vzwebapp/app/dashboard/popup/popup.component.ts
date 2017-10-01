import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from './../../services/nav.service';
import {ColorPickerService} from 'angular2-color-picker';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AuthService } from './../../services/auth.service';
import { ConfigService } from './../../services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';


declare var $:any; 
@Component({
	selector:'pop-up',
	moduleId: module.id,
	templateUrl: 'popup.component.html'
})


export class PopupComponent implements OnInit
{
	    alertPop:any;
      fadeTarget:any;
      viewCameraPopup:any;
      fadeEffect:any;
      fadeEffectDoor:any;
      viewCameraPopupDoor:any;
      fadeTargetDoor:any;

constructor(private router: Router,private _http: Http,private auth: AuthService){
    }
 ngOnInit(){
 	    this.alertPop=document.querySelector(".alertPopup");

     this.fadeTarget = document.querySelector(".viewCamera");
     this.viewCameraPopup=document.querySelector("#viewCameraPopup");
     this.viewCameraPopupDoor=document.querySelector("#viewCameraPopupDoor");
     this.fadeTargetDoor=document.querySelector(".viewCameraDoor");
     this.alertPop.querySelector(".cameraPopupWrapper").style.display="none";

 }
goToCamera()
{
  let alertPop=this.alertPop;
	//this.alertPop.style.display="none";
  
   alertPop.querySelector(".alertPopupWrapper").style.display="none";
    alertPop.querySelector(".alertPopupDoor").style.display="none";
  alertPop.querySelector(".alertPopupWrapper").style.display="none";
  //alertPop.querySelector(".cameraPopupWrapper .cameraInPopup").src="http://10.22.20.223/axis-cgi/mjpg/video.cgi";
  alertPop.querySelector(".cameraPopupWrapper .cameraInPopup").src="https://cpplus.happiestminds.com/axis-cgi/mjpg/video.cgi";
  alertPop.querySelector(".cameraPopupWrapper").style.display="block";
  // this.cameraStream().subscribe(
  //        (data) => {
  //               console.log(data);
  //           },
  //           (err) => {
  //                console.log(err);
  //           });
    
   //alertPop.querySelector(".cameraPopupWrapper video").poster="../../../assets/img/cover.jpeg";
	//this.router.navigate(['/camera']);
}
cancelPopup()
{
    this.changeStyleOutPopup();
    this.alertPop.style.display="none";
    this.alertPop.querySelector(".cameraPopupWrapper").style.display="none";
     this.alertPop.querySelector(".cameraPopupWrapper .cameraInPopup").src="";


}
cancelPopupCamera()
{
  this.changeStyleOutPopup();
  let alertPop=this.alertPop;
  //this.alertPop.style.display="none";
  alertPop.querySelector(".cameraPopupWrapper").style.display="none";
  alertPop.style.display="none";
   alertPop.querySelector(".alertPopupWrapper").style.display="block";

}
changeStylePopup()
    {
    	// e.target.closest('div').querySelector('.viewCamera').style.visibility="visible";
    }
       changeStyleOutPopup()
    {    
      console.log('out');
        this.fadeTarget.style.color="#f27700";
        this.fadeTarget.style.opacity="1";
         this.fadeTarget.style.fontSize="12px";
        this.viewCameraPopup.style.opacity="1";
        clearInterval(this.fadeEffect);
    	// e.target.closest('div').querySelector('.viewCamera').style.visibility="hidden";
    }
    fadeOutEffect() {
      console.log('in');
    let fadeTarget=this.fadeTarget;
     let viewCameraPopup=this.viewCameraPopup;
      this.fadeEffect = setInterval(function () {
           if (!fadeTarget.style.fontSize) {
            fadeTarget.style.fontSize = "16px";
            }
           if(fadeTarget.style.fontSize=="16px")
           {
               fadeTarget.style.fontSize="12px";
           }
            else
           {
               fadeTarget.style.fontSize="16px";
           }
            if (!fadeTarget.style.color) {
            fadeTarget.style.color = "rgb(242, 119, 0)";
            }
           if(fadeTarget.style.color=="rgb(242, 119, 0)")
           {
               fadeTarget.style.color="red";
           }
            else
           {
               fadeTarget.style.color="rgb(242, 119, 0)";
           }
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity < 0.6) {
            fadeTarget.style.opacity = 1;
            //clearInterval(fadeEffect);
        } else {
            fadeTarget.style.opacity -= 0.1;
        }
         if (!viewCameraPopup.style.opacity) {
            viewCameraPopup.style.opacity = 1;
        }
        if (viewCameraPopup.style.opacity < 0.8) {
            viewCameraPopup.style.opacity = 1;
            //clearInterval(fadeEffect);
        } else {
            viewCameraPopup.style.opacity -= 0.1;
        }
    }, 500);
}
       changeStyleOutPopupdoor()
    {    
        this.fadeTargetDoor.style.color="#f27700";
        this.fadeTargetDoor.style.opacity="1";
         this.fadeTargetDoor.style.fontSize="12px";
        this.viewCameraPopupDoor.style.opacity="1";
        clearInterval(this.fadeEffectDoor);
    }
    fadeOutEffectDoor() {
    let fadeTarget=this.fadeTargetDoor;
     let viewCameraPopup=this.viewCameraPopupDoor;
      this.fadeEffectDoor = setInterval(function () {
           if (!fadeTarget.style.fontSize) {
            fadeTarget.style.fontSize = "16px";
            }
           if(fadeTarget.style.fontSize=="16px")
           {
               fadeTarget.style.fontSize="12px";
           }
            else
           {
               fadeTarget.style.fontSize="16px";
           }
            if (!fadeTarget.style.color) {
            fadeTarget.style.color = "rgb(242, 119, 0)";
            }
           if(fadeTarget.style.color=="rgb(242, 119, 0)")
           {
               fadeTarget.style.color="red";
           }
            else
           {
               fadeTarget.style.color="rgb(242, 119, 0)";
           }
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity < 0.6) {
            fadeTarget.style.opacity = 1;
            //clearInterval(fadeEffect);
        } else {
            fadeTarget.style.opacity -= 0.1;
        }
         if (!viewCameraPopup.style.opacity) {
            viewCameraPopup.style.opacity = 1;
        }
        if (viewCameraPopup.style.opacity < 0.8) {
            viewCameraPopup.style.opacity = 1;
            //clearInterval(fadeEffect);
        } else {
            viewCameraPopup.style.opacity -= 0.1;
        }
    }, 500);
}

}
