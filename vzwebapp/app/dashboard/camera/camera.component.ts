import { Component, OnInit } from '@angular/core';
import { NavService } from './../../services/nav.service';
import { AuthService } from './../../services/auth.service';
import { ConfigService } from './../../services/config.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;

@Component({
    selector: 'camera-cmp',
    moduleId: module.id,
    templateUrl: 'camera.component.html'
})

export class CameraComponent implements OnInit{
		videoCamera:any;
    cameraName:any;
		 allWidgets: any = [];
	    widgets: any = [];
	    isLoading: boolean = false;
	    widgetNumber: any;
	    constructor(private nav:NavService, private _http: Http, private configUrl: ConfigService,
	    private auth: AuthService,){}
        ngOnInit(){
          this.videoCamera=document.querySelector("#videoCamera");
          this.cameraName=document.querySelector(".cameraNameStream");
          this.videoCamera.src="../../../assets/img/dummyvidlarge.png";

         	// /this.showData();
   //      sessionStorage.setItem("stateData","");
	  //       navigator.mediaDevices.enumerateDevices()
			// .then(function(devices) {
			//   devices.forEach(function(device) {
			//     console.log('device',device);
			//   });
			// })
			// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
			//          this.video.src = window.URL.createObjectURL(stream);
			//          this.video.play();
			//     });
			// }
    }
    showVideo(e)
    {
    	console.log(e.target);
      if(e.target.closest('a').querySelector('.thumbImg').src.indexOf('dummyvid.png')>=0)
      {
        this.cameraName.innerHTML=e.target.closest('a').querySelector('.cameraName').innerHTML;
      }
      else{
      this.cameraName.innerHTML=e.target.closest('a').querySelector('.cameraName').innerHTML;
    }
    this.videoCamera.src="http://10.22.20.223/axis-cgi/mjpg/video.cgi";
    }
    changeStyle(e)
    {
    	e.target.closest('a').querySelector('.view').style.visibility="visible";
      e.target.closest('a').querySelector('.view').style.opacity="1";
    	// e.target.closest('a').querySelector('.otherImg').style.display="none";
    }
       changeStyleOut(e)
    {
    	e.target.closest('a').querySelector('.view').style.visibility="hidden";
      e.target.closest('a').querySelector('.view').style.opacity="0";
    	// e.target.closest('a').querySelector('.otherImg').style.display="block";
    }




}
