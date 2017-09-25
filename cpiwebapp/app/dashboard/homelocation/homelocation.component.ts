import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { NavService } from '../../services/nav.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { ConfigService } from './../../services/config.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';

declare var $:any;

@Component({
    selector: 'homelocation-cmp',
    moduleId: module.id,
    templateUrl: 'homelocation.component.html',
    animations: [
       trigger(
            'deviceAnimation',
        [
        transition(
        ':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('800ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      )]
      
       )
    ],
})

export class HomelocationComponent implements OnInit{
    videoCamera:any;
    error: any;
    widgets:any;
    hideAll:boolean = false;
    classForBulb:any;
    isLoading: boolean = false;
    forLoading: boolean = false;
    private _setIntervalHandler: any;
    private _setIntervalHandlerBulb:any;
    loggedPerson: any = localStorage.getItem("uname");

    alert:any;
    alertPopupWrapper:any;
    cameraPopupWrapper:any;
    alertPopupDoor:any;
    flagFirePop:boolean=false;
    flagDoorPop:boolean=false;
    mainPanel:any;
    tvBulb:any;
    thermostatBulb:any;
    bedroomWhiteBulb:any;
    bedroomColorBulb:any;
    kitchenBulb:any;
    diningTableBulb:any;
    balconyBulb:any;
    dataIndividual:any={};
    mapping:any={};

    constructor(private nav:NavService, private _http: Http, private configUrl: ConfigService,
    private auth: AuthService, private _router: Router){}
    ngOnInit(){

      this.tvBulb="10004"
      this.thermostatBulb="10000";//window bulb
      this.bedroomWhiteBulb="10002";
      this.bedroomColorBulb="10006";
      this.kitchenBulb="10005";
      this.diningTableBulb="10003";
      this.balconyBulb="10001";//camera
      this.mapping=
      {
        "tvBulb":"Color Strip  In Hall",
        "thermostatBulb":"Color Bulb  In Hall",
        "bedroomWhiteBulb":"Color Bulb For Bedroom 1",
        "bedroomColorBulb":"White Bulb For Bedroom 2",
        "kitchenBulb":"White Bulb In Kitchen",
        "diningTableBulb":"While Bulb For Dining Table",
        "balconyBulb":"Color Bulb Near Camera",
      }
      this.alert=document.querySelector(".alertPopup");
      this.alertPopupWrapper=document.querySelector(".alertPopupWrapper");
      this.cameraPopupWrapper=document.querySelector(".cameraPopupWrapper");
      this.alertPopupDoor=document.querySelector(".alertPopupDoor");
        this.mainPanel=document.querySelector('.main-panel');

       if(this.mainPanel){
          this.mainPanel.style.width="100%";
          }

        this.auth.isShowDemo = true;
        this.showData();
        sessionStorage.setItem("popupData","");
        sessionStorage.setItem("popupDataDoor","");
        if(this.configUrl.autoRefresh == true){
            let self = this;
            this._setIntervalHandler = setInterval(() => {
                if(sessionStorage.getItem("popupData") == undefined){
                    clearInterval(self._setIntervalHandler);
                } else {
                    self.showAlertData();
                }
            }, 10000);

             this._setIntervalHandlerBulb = setInterval(() => {
                if(sessionStorage.getItem("stateDataTotal") == undefined){
                    clearInterval(self._setIntervalHandlerBulb);
                } else {
                    self.showData();
                }
            }, 5000);
            
        }
    }
 
    showBulbName()
    {
      return ((this.showWidgetType && this.mapping[this.showWidgetType])
        ?this.mapping[this.showWidgetType]:'');
    }
    showProfilePopup(dataIndividual)
    {
      dataIndividual.showProfile=true;
    }
     showPublicProfile(type){
       return type == "PUBLIC";
    }
     backToControls(dataIndividual){
        dataIndividual.showProfile = false;
    }
    ngOnDestroy() {
      this.auth.isShowDemo = false;
      clearInterval(this._setIntervalHandlerBulb);
    }
    goPreviousView(){
       this.auth.isShowDemo = false;
       //this._router.navigate(['dashboard']);
       //window.history.back();
    }
      iconBackgroundColor(brandName){
        let backgroundColor;
        if(brandName && brandName.indexOf("Philips") > -1){
            backgroundColor = "#000";
        }
        if(brandName && brandName.indexOf("Insteon") > -1){
            backgroundColor = "#0eb5ca";
        }
        return backgroundColor;
    }
    logout(){
       this.auth.setLogout();
        this._router.navigate(['login']);
    }

        deviceIcon(deviceId,thisDeviceType){
       
       let data=JSON.parse(sessionStorage.getItem("stateDataTotal")),
       dataForIcon={'deviceType':'','brandName':''};
       if(data){
       for(let i=0;i<data.length;i++){
           if(data[i].deviceId==deviceId)
             {
               dataForIcon=data[i];
             //if(this.devices[i].state != "No Stat
             }
           }
         }
          return data?(thisDeviceType.indexOf(dataForIcon.deviceType)>=0 && thisDeviceType.indexOf( dataForIcon.brandName)>=0):false;
}
    bulbonOff(deviceId)
    {
      let data=JSON.parse(sessionStorage.getItem("stateDataTotal")),
       bulbOnOff=false;
       if(data){
       for(let i=0;i<data.length;i++){
           if(data[i].deviceId==deviceId)
             {
               if(data[i].state.on==true)
               {
               bulbOnOff=true;
               break;
             }
               else
               {
               bulbOnOff=false;
               break;
             }
             //if(this.devices[i].state != "No Stat
             }
           }
         }
         return bulbOnOff;
    }
        //    if("Philips colorstrip".indexOf(dataForIcon.deviceType)>=0 && "Philips colorstrip".indexOf(dataForIcon.brandName)>=0)
        //    {
        //      return 'timeline';

        //    }
        //    if("Philips whitebulb".indexOf(dataForIcon.deviceType)>=0 && "Philips whitebulb".indexOf(dataForIcon.brandName)>=0)
        //    {
        //      return 'lightbulb_outline';

        //    }
        //    if("Philips colorbulb".indexOf(dataForIcon.deviceType)>=0 && "Philips colorbulb".indexOf(dataForIcon.brandName)>=0)
        //    {
             
        //     return 'lightbulb_outline';

        //    }
        //    if("Insteon whitebulb".indexOf(dataForIcon.deviceType)>=0 && "Insteon whitebulb".indexOf(dataForIcon.brandName)>=0)
        //    {
        //        return 'lightbulb_outline';

        //    }
        // //return thisDeviceType.indexOf(device.deviceType)>=0 && thisDeviceType.indexOf( device.brandName)>=0;
   // }
    // deviceIcon(device, thisDeviceType){
       

    //     return thisDeviceType.indexOf(device.deviceType)>=0 && thisDeviceType.indexOf( device.brandName)>=0;
    // }
    checkCapable(capablelist,capable){
        let capablelistItems = []
        for(let i=0;i<capablelist.length;i++){
            capablelistItems.push(capablelist[i].capabilityName)
        }
        if(capablelistItems.indexOf(capable) > -1){
            return true;
        }
    }
    showWidgetType:any="";
    // setTypeWidget(widget){
    //     this.showIndex = "";
    //     this.hideAll = true;
    //     this.typeWidget = widget;
    // }
    // getTypeWidget(widget){
    //     return this.typeWidget == widget;
    // }
    showIndex:any;
    showControl(i){
       return i == this.showIndex;
    }
     cancelWidget()
        {
          this.showWidgetType="";
          this.dataIndividual={};
        }
      showThermostatPopupCheck()
    {
      if(this.showWidgetType=='thermostat')
      {

        return true;
      }
      else
        {
          return false;
        }
    }
        showThermostatPopup(type,id)
    {
      this.showWidgetType=type;
      let data=JSON.parse(sessionStorage.getItem("stateDataTotal"));
       for(let i=0;i<data.length;i++){
           if(data[i].deviceId==id)
           {
             this.dataIndividual=data[i];
             break;
             //if(this.devices[i].state != "No Stat
           }
           }
         console.log(this.dataIndividual.deviceProfile);  

    }
    showPopupCheck()
    {
      console.log(this.dataIndividual);
      if(Object.keys(this.dataIndividual).length==0)
      {
        return false;
      }
      else{
         if(this.showWidgetType!='camera' && this.showWidgetType!='thermostat')
         {
          return true;
         }
         else
         {
           return false
         }
      }
    }
    showCameraPopupCheck()
    {
      if(this.showWidgetType=='camera')
      {

        return true;
      }
      else
        {
          return false;
        }
    }
        showCameraPopup(type)
    {
      this.showWidgetType=type;
      this.dataIndividual={};

    }
    showPopup(type,id){
      this.showWidgetType=type;
      let data=JSON.parse(sessionStorage.getItem("stateDataTotal"));
       for(let i=0;i<data.length;i++){
           if(data[i].deviceId==id)
           {
             this.dataIndividual=data[i];
             break;
             //if(this.devices[i].state != "No Stat
           }
           }
           
           console.log('this.dataIndividual',this.dataIndividual);
        //this.showWidgetType=type;
    }
    deviceName(name){
        var name = name.substring(0, 14);
        return name;
    }
    
    popupstyle()
    {
      this.classForBulb=document.querySelector('.'+this.showWidgetType);
      let obj={};
      if(this.classForBulb){
      let leftPopup=parseInt(this.classForBulb.offsetLeft)!=NaN?((parseInt(this.classForBulb.offsetLeft)+2)):"10",
      topPopup=parseInt(this.classForBulb.offsetTop)!=NaN?((parseInt(this.classForBulb.offsetTop))):"10";
      obj={"left":leftPopup+'px',"top":topPopup +'px',"cursor":"pointer", "position":"absolute"}
    }
    else
    {
      obj={"left":"10px","top":"10px","cursor":"pointer", "position":"absolute"}
    }
      return obj;
    }
    getData(){
        let headers = new Headers();  
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let params = "includeState=true&includeCapability=true";
        //let params = "includeState=true";
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
      if(this.forLoading == false){
         this.isLoading = true;
      }
      return this._http.get(this.configUrl.apiPath+'/cpi/devices/profiles', options)
         .map((response: Response)=> response.json())
    }
    keyname:any;
    generateObj(devicename,widgets)
    {
      let deviceId=widgets.deviceId,
      deviceType=widgets.deviceType;
      this.keyname=devicename.concat(deviceType).concat(deviceId)
      console.log(devicename);
      console.log(deviceId);
      console.log(deviceType);
      return  this.keyname;
    }
    showTemplateData(res)
    {
         let arr = [],
          arrTot=[];
          let arrObj = [];
          this.widgets = res; 
           for(let i=0;i<this.widgets.length;i++){
              if(this.widgets[i].state != "No State In CPI "){
                  this.widgets[i].state = JSON.parse(this.widgets[i].state);
                  this.widgets[i].state.brightness = this.widgets[i].state.brightness == null ? 0 : this.widgets[i].state.brightness;
                  this.widgets[i].state.saturation = this.widgets[i].state.saturation == null ? 0 : this.widgets[i].state.saturation;
                  this.widgets[i].showProfile = false;
                  if(this.widgets[i].state.on=="false")
                  {
                    this.widgets[i].state.on=false;
                  }
                   else if(this.widgets[i].state.on=="true")
                  {
                    this.widgets[i].state.on=true;
                  }
                    for(let j=0;j<this.widgets[i].deviceProfile.length;j++){
                     if(this.widgets[i].deviceProfile[j].name=="brand" ||  this.widgets[i].deviceProfile[j].name=="Brand")
                     {
                      this.widgets[i].brandName = this.widgets[i].deviceProfile[j].value; 
                      // break;
                     }

                     if(this.widgets[i].deviceProfile[j].name=="brand"){
                    this.widgets[i].keyname=this.generateObj(this.widgets[i].deviceProfile[j].value,this.widgets[i]);
                   }

                     // if(this.widgets[i].deviceProfile[j]['Device Name']=="Philips Color Bulb")
                     // {
                     //   arrObj.push(this.generateObj(this.widgets[i].deviceProfile[j]['Device Name'],this.widgets[i]));
                     // }
                   }
              } else {
                  this.widgets[i].state = {}
                  this.widgets[i].state.on = true;
                  this.widgets[i].state.brightness = 0;
                  this.widgets[i].state.saturation = 0;
                  this.widgets[i].state.hue = 1000;
                  this.widgets[i].state.reachable = "true";
                  this.widgets[i].showProfile = false;
                  for(let j=0;j<this.widgets[i].deviceProfile.length;j++){
                     if(this.widgets[i].deviceProfile[j].name=="brand" ||  this.widgets[i].deviceProfile[j].name=="Brand")
                     {
                      this.widgets[i].brandName = this.widgets[i].deviceProfile[j].value; 
                     }
                      if(this.widgets[i].deviceProfile[j].name=="brand"){
                      this.widgets[i].keyname=this.generateObj(this.widgets[i].deviceProfile[j].value,this.widgets[i]);

                   }

                   }
              }
               arr.push(this.widgets[i].state);
               arrTot.push(this.widgets[i]);
          } 
          console.log(arr); 
          //arrObj
          let totalArray = "";
          // for(let k=0;k<arr.length;k++){
          //     let j = JSON.stringify(arr[k]);
          //     totalArray = totalArray.concat(j);
          // }
          // let totalNewState = sessionStorage.getItem("stateData");
          // if(totalNewState != ""){
          //     totalNewState = JSON.parse(totalNewState);
          // }
          // let totalNewState1 = "";
          // if(totalNewState != undefined){
          //     for(let z=0;z<totalNewState.length;z++){
          //           let m = JSON.stringify(totalNewState[z]);
          //           totalNewState1 = totalNewState1.concat(m);
          //     }
          // }
          // if(totalArray != totalNewState1){
          //    //this.allWidgets = this.widgets;
          //    //console.log(this.allWidgets);
          //    sessionStorage.setItem("stateData", JSON.stringify(arr));
          // } else {
          //     console.log("equal")
          // }
           sessionStorage.setItem("stateData", JSON.stringify(arr));
           sessionStorage.setItem("stateDataTotal", JSON.stringify(arrTot));
    }
    showData(){
          this.getData().subscribe((res) => {
            console.log(res);
            this.forLoading = true;
            this.isLoading = false;
            this.showTemplateData(res);
        },
         (err) => {
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.getData().subscribe((data)=>{
                             self.forLoading = true;
                            self.isLoading = false;
                            self.showTemplateData(data);
                       })
                    })
               
                }
                else
                {
                  this.forLoading = true;
                  this.isLoading = false;
                }
            })
    }

    putOnorOff(onof,deviceId) {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let params = "userName="+localStorage.getItem("uname");
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
        let on = onof == true ? "switch" : "switch"
        let switchon = onof == true ? "ON" : "OFF"
        let data= {
            "deviceId":deviceId,
            "actionType":on,
            "command":switchon
        }
        let url2 = this.configUrl.apiPath+'/cpi/commands'
             return this._http
                .post(url2, data, options)
                .map(res => res.json());
       
    }
    data: any;
    showOnorOff(onof,deviceId){
          this.putOnorOff(onof,deviceId).subscribe(
            (data) =>{
                console.log(data);
            },
           (err) => {
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.putOnorOff(onof,deviceId).subscribe((data)=>{
                           console.log(data);
                       })
                    })
               
                }
            });
    }

    putChangeColor(color,deviceId) {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let params = "userName="+localStorage.getItem("uname");
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
        let data= {
            "deviceId":deviceId,
            "actionType":"hue",
            "command":color.toString()
        }
        let url = this.configUrl.apiPath+'/cpi/commands';
        return this._http
                    .post(url, data, options)
                    .map(res => res.json());
    }
    showChangeColor(color,deviceId){
          this.putChangeColor(color,deviceId).subscribe(
            (data) => this.data = data,
            (err) => {
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.putChangeColor(color,deviceId).subscribe((data)=>{
                           console.log(data);
                       })
                    })
               
                }
            });
    }
        putChangeBrightness(bright,deviceId) {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let params = "userName="+localStorage.getItem("uname");
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
        let data= {
             "deviceId":deviceId,
             "actionType":"brightness",
             "command":bright.toString()
        }
        let url = this.configUrl.apiPath+'/cpi/commands';
        //let url1 = 'http://jsonplaceholder.typicode.com/posts/1';
        return this._http
                    .post(url, data, options)
                    .map(res => res.json());
    }
        showChangeBrightness(bright,deviceId){
          this.putChangeBrightness(bright,deviceId).subscribe(
            (data) => this.data = data,
           (err) => {
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.putChangeBrightness(bright,deviceId).subscribe((data)=>{
                           console.log(data);
                       })
                    })
               
                }
            });
    }

     putChangeSaturation(saturation,deviceId) {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let params = "userName="+localStorage.getItem("uname");
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
        let data= {
            "deviceId":deviceId,
            "actionType":"saturation",
            "command":saturation.toString()
        }
        let url = this.configUrl.apiPath+'/cpi/commands';
        //let url1 = 'http://jsonplaceholder.typicode.com/posts/1';
        return this._http
                    .post(url, data, options)
                    .map(res => res.json());
    }
    showChangeSaturation(saturation,deviceId){
          this.putChangeSaturation(saturation,deviceId).subscribe(
            (data) => this.data = data,
           (err) => {
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.putChangeSaturation(saturation,deviceId).subscribe((data)=>{
                           console.log(data);
                       })
                    })
               
                }
            });
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
         let params = "includeState=true";
        headers.append('Authorization', "bearer "+this.auth.getToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
      //this.isLoading = true;

      return this._http.get(this.configUrl.apiPath+'/cpi/devices/7', options)
         .map((response: Response)=> response.json())
    }
     getAlertDataForDoor(){
        let headers = new Headers();  
         let params = "includeState=true";
       
         headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let options = new RequestOptions({
            headers: headers,
            search: new URLSearchParams(params)
        });
      //this.isLoading = true;

      return this._http.get(this.configUrl.apiPath+'/cpi/devices/10', options)
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


}
