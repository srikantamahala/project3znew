import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import initDemo = require('../../../assets/js/charts.js');
import { NavService } from '../../services/nav.service';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { ConfigService } from './../../services/config.service';
import { AuthService } from './../../services/auth.service';


declare var $:any;

@Component({
    selector: 'home-cmp',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{
    alert:any;
    alertPopupWrapper:any;
    cameraPopupWrapper:any;
    _setIntervalHandler: any;
    allWidgets: any = [];
    widgets: any = [];
    isLoading: boolean = false;
    widgetNumber: any;
    alertPopupDoor:any;

    flagFirePop:boolean=false;
    flagDoorPop:boolean=false;
    
    constructor(private nav:NavService, private _http: Http, private configUrl: ConfigService,
    private auth: AuthService,private anim: AuthService){}
    ngOnInit(){
      this.alert=document.querySelector(".alertPopup");
      this.alertPopupWrapper=document.querySelector(".alertPopupWrapper");
      this.cameraPopupWrapper=document.querySelector(".cameraPopupWrapper");
      this.alertPopupDoor=document.querySelector(".alertPopupDoor");
        // initDemo();
        this.showData();
        //this.showAlertData();
        sessionStorage.setItem("popupData","");
        sessionStorage.setItem("popupDataDoor","");
        if(this.configUrl.autoRefresh == true){
                let self = this;
                self._setIntervalHandler = setInterval(() =>{
                    if(sessionStorage.getItem("popupData") == undefined && sessionStorage.getItem("popupDataDoor") == undefined)
                    {
                        clearInterval(self._setIntervalHandler);
                    } 
                    else 
                    {
                       //clearInterval(self._setIntervalHandler);
                         self.showAlertData();
                    }
                }, 10000);
        //     }
    }
  }
  // ngOnDestroy() {
  //      clearInterval(this._setIntervalHandler);
  //   }
    getData(){
        let headers = new Headers();  
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let params = "includeState=true&includeCapability=true";
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
      this.isLoading = true;
      return this._http.get(this.configUrl.apiPath+'/cpi/devices/profiles', options)
         .map((response: Response)=> response.json())
    }
    error: any;
    showData(){
      let arr = [];
      let lwidget = {}
      this.getData().subscribe((res) => {
          this.isLoading = false;
          this.widgets = res;
          this.widgetNumber = this.widgets.length;
          
        },
         (err) => {
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.getData().subscribe((data)=>{
                            self.isLoading = false;
                            self.widgets = data;
                            self.widgetNumber = self.widgets.length;
                       })
                    })
               
                }
            })
    }
    showAlertData(){
      let self=this;
       this.getAlertData().subscribe(
            (data) => {
                this.checkDataChange(self,data);
            },
            (err) => {
              let data=[];
               this.flagFirePop=false;
              console.log(err);
              //this.checkDataChange(self,data);
            });
       Observable.forkJoin(
        this.getAlertDataForDoor(),
        this.getAlertDataForConfig()).subscribe(
            (data) => {
                this.checkDataChangeForDoor(self,data);
            },
            (err) => {
              let data=[];

              this.flagDoorPop=false;
              console.log(err);
              //this.checkDataChange(self,data);
            });
    }
    checkDataChangeForDoor(self,data)
    {
      let  configValue="";

         if(data[1]) {
           for(let i=0;i<data[1].length;i++)
           {
             if(data[1][i].name=="security_mode")
              configValue=data[1][i].value;
           }
           let jsonPopup={
           "ten":data[0].state,
           "config":configValue,
           };

           sessionStorage.setItem("popupDataDoor",JSON.stringify(jsonPopup));
          let doorPopup=JSON.parse(sessionStorage.getItem("popupDataDoor"));
          console.log(doorPopup);

         if(doorPopup!= undefined && JSON.parse(doorPopup.ten) && doorPopup.config)
         {
               let  devTen = JSON.parse(doorPopup.ten).status,
                  deviceConfig = doorPopup.config;
                  console.log('devTen',devTen);
                  console.log('deviceConfig',deviceConfig);
            if(devTen.toLowerCase()=="opened" && deviceConfig.toLowerCase()=="enabled")
            {
              self.flagDoorPop=true;
               // if(self.alert.style.display!="flex"){
                if(self.cameraPopupWrapper.style.display!="block") {
                self.alertPopupWrapper.style.display="none";
                 self.alertPopupDoor.style.display="block";
                self.alert.style.display="flex";
              }
                //}
              }
              else
              {
                self.flagDoorPop=false;
              //   self.cameraPopupWrapper.style.display="none";
                 self.alertPopupDoor.style.display="none";
              }
         }
         else
         {
           self.flagDoorPop=false;
           //self.alert.style.display="none";
            //self.cameraPopupWrapper.style.display="none";
             self.alertPopupDoor.style.display="none";
         }
       }
         else
         {
           self.flagDoorPop=false;
          // self.alert.style.display="none";
           //self.cameraPopupWrapper.style.display="none";
             self.alertPopupDoor.style.display="none";
         }
      if(self.cameraPopupWrapper.style.display!="block") {
          if(self.flagDoorPop==false && self.flagFirePop==false)
          {
            self.alert.style.display="none";
          }
          else{
            if(self.alert.style.display!="flex"){
              self.alert.style.display="flex";
            }
          }
      }
     }

       checkDataChange(self,data)
   {     
     console.log(data);
     let configValue=""
     if(data.state){


         sessionStorage.setItem("popupData",JSON.stringify(data.state));
        let newDataPopup=JSON.parse(sessionStorage.getItem("popupData"));
        console.log(newDataPopup);

       if(newDataPopup!= undefined && JSON.parse(newDataPopup).status)
       {

          if(JSON.parse(newDataPopup).status.toLowerCase()=="detected")
          {
            self.flagFirePop=true;
            // if(self.alert.style.display!="flex"){
              //self.cameraPopupWrapper.style.display="none";
              if(self.cameraPopupWrapper.style.display=="none") {
              self.alertPopupDoor.style.display="none";
              self.alertPopupWrapper.style.display="block";
              self.alert.style.display="flex";
            }

             // }
            }
            else
            {
              self.flagFirePop=false;
              //self.alert.style.display="none";
              //self.cameraPopupWrapper.style.display="none";
              self.alertPopupWrapper.style.display="none";
            }
       }
       else
       {
         self.flagFirePop=false;
         //self.alert.style.display="none";
        // self.cameraPopupWrapper.style.display="none";
        self.alertPopupWrapper.style.display="none";
       }
     }
     else
     {
       self.flagFirePop=false;
      // self.cameraPopupWrapper.style.display="none";
        self.alertPopupWrapper.style.display="none";
       //self.alert.style.display="none";
     }
     console.log('self.flagDoorPop',self.flagDoorPop);
     console.log('self.flagFirePop',self.flagFirePop);
      if(self.cameraPopupWrapper.style.display=="none") {
     if(self.flagDoorPop==false && self.flagFirePop==false)
        {
          self.alert.style.display="none";
        }
        else
        {
          if(self.alert.style.display!="flex"){
            self.alert.style.display="flex";
          }
        }
        }
   }
     getAlertData(){
        let headers = new Headers();  
        headers.append('Authorization', "bearer "+this.auth.getToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({
            headers: headers
        });
      //this.isLoading = true;

      return this._http.get(this.configUrl.apiPath+'/cpi/devices/7/state', options)
         .map((response: Response)=> response.json())
    }
     getAlertDataForDoor(){
        let headers = new Headers();         
         headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let options = new RequestOptions({
            headers: headers
        });
      //this.isLoading = true;

      return this._http.get(this.configUrl.apiPath+'/cpi/devices/10/state', options)
         .map((response: Response)=> response.json())
    }
    getAlertDataForConfig(){
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let options = new RequestOptions({
            headers: headers
        });
      //this.isLoading = true;

      return this._http.get(this.configUrl.apiPath+'/cpi/accounts/configurations', options)
         .map((response: Response)=> response.json())
    }

    setBack(){
       this.nav.isGoBack = true;
    }
    // showPopup()
    // {
    //  this.alert.style.display="flex";
    // }

}
