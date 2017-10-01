import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import { ConfigService } from './../../services/config.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';



@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
	    securityOn:boolean;
      error: any;
      isLoading: boolean = false;
      forLoading: boolean = false;
      private _setIntervalHandlerThermo: any;
      loggedPerson: any = localStorage.getItem("uname");
      toPeakVal:any="";
      frPeakVal:any="";
      toPeakOffVal:any="";
      frPeakOffVal:any="";
      mainPanel:any;
          constructor(private _http: Http, 
          private auth: AuthService, private router: Router, private route: ActivatedRoute,
          private configUrl: ConfigService){}

    ngOnInit(){
          this.auth.isShowDemo = false;
          // this.mainPanel=document.querySelector('.main-panel');
          //  if(this.mainPanel){
          //     this.mainPanel.style.width="100%";
          //   }
          this.fetchsecurityOnorOff().subscribe(
            (data) =>{
              this.isLoading = false;
              if(data.length>0){
               for(let i=0;i<data.length;i++)
              {
               if(data[i].name=="security_mode")
                if(data[i].value=="enabled")
                {
                    this.securityOn=true;
                }
                else
                {
                  this.securityOn=false;
                }
             }
           }
           else
           {
             this.securityOn=false;
           }

            },
           (err) => {
               console.log(err);
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.fetchsecurityOnorOff().subscribe((data)=>{
                           console.log(data);
                             if(data.length>0){
                           for(let i=0;i<data.length;i++)
                          {
                               if(data[i].name=="security_mode")
                               if(data[i].value=="enabled")
                                 {
                                  self.securityOn=true;
                                 }
                                    else
                                  {
                                  self.securityOn=false;
                                  }
                             }
                           }
                       else
                           {
                             self.securityOn=false;
                          }
                       })    
                    })
                }
                else
                {
                         this.securityOn=false; 
                }                        

            });
          this.repeatPeakHours();
        //      if(this.configUrl.autoRefresh == true){
        //         let self = this;
        //          this._setIntervalHandlerThermo = setInterval(() => {
        //             // if(sessionStorage.getItem("stateDataTotal") == undefined){
        //             //     clearInterval(self._setIntervalHandlerThermo);
        //             // } else {
        //             //     self.repeatPeakHours();
        //             // }
        //             self.repeatPeakHours();
        //         }, 5000);
            
        // }
    }
    ngOnDestroy() {
      this.auth.isShowDemo = false;
      clearInterval(this._setIntervalHandlerThermo);
    } 
    resetPeakHour()
    {
       this.toPeakVal="";
      this.frPeakVal="";
      this.toPeakOffVal="";
      this.frPeakOffVal="";
    }
    repeatPeakHours()
    {
           this.getPeakHours().subscribe(
            (res) =>{
              this.manipulatePeakHours(res)
            }, 
            (err) => {
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.getPeakHours().subscribe((data)=>{
                             self.forLoading = true;
                            self.isLoading = false;
                            self.manipulatePeakHours(data);
                       })
                    })
               
                }
                else
                {
                  this.forLoading = true;
                  this.isLoading = false;
                }
            });
    }
    manipulatePeakHours(data)
    {
        if(data.length>0){
               for(let i=0;i<data.length;i++)
              {
               if(data[i].name=="peak_hours")
               {
                 let value=data[i].value,
                  hyphenIndex=value.indexOf('-'),
                 length=data[i].value.length;
                 if(hyphenIndex>=0 && length>0)
                 {
                   this.toPeakVal=value.substring(hyphenIndex+1,value.length);
                   this.frPeakVal=value.substring(0,hyphenIndex);
                 }
               }
               else if(data[i].name=="off_peak_hours")
               {
                 let value=data[i].value,
                  hyphenIndex=value.indexOf('-'),
                 length=data[i].value.length;
                 if(hyphenIndex>=0 && length>0)
                 {
                   this.toPeakOffVal=value.substring(hyphenIndex+1,value.length);
                   this.frPeakOffVal=value.substring(0,hyphenIndex);
                 }
               }
             }
           }
    }
    savePeakHour()
    {
      this.peakHour().subscribe(
            (data) =>{
                console.log(data);
                 this.forLoading = true;
                this.isLoading = false;
            },
           (err) => {
               console.log(err);
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.peakHour().subscribe((data)=>{
                           console.log(data);
                            self.forLoading = true;
                            self.isLoading = false;
                       })
                    })
                }
                  else
                {
                  this.forLoading = true;
                  this.isLoading = false;
                  }
            });
    }
       peakHour() {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let options = new RequestOptions({
            headers: headers
        });
        if(this.forLoading == false){
         this.isLoading = true;
      }
      let peakOn= this.frPeakVal+'-'+this.toPeakVal,
      peakOff=this.frPeakOffVal+'-'+this.toPeakOffVal;
        // let on = onof == true ? "switch" : "switch"
        // let switchon = onof == true ? "ON" : "OFF"
           let data= 
           {
          "configurations": [{
              "name": "peak_hours",
              "value": peakOn
            },
            {
              "name": "off_peak_hours",
              "value": peakOff
            }
        ]
    } ;

          console.log(data);
        let url2 = this.configUrl.apiPath+'/cpi/accounts/configurations';
        return this._http.post(url2, data, options).map(res => res);
       
    }
    getPeakHours()
    {
      let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let options = new RequestOptions({
            headers: headers
        });
        let url2 = this.configUrl.apiPath+'/cpi/accounts/configurations';
             return this._http
                .get(url2,options)
                .map(res => res.json());
    }

     logout(){
         this.auth.setLogout();
          this.router.navigate(['login']);
    }
    showOnorOff()
    {
    	this.securityOnorOff().subscribe(
            (data) =>{
                console.log(data);
                 this.forLoading = true;
                this.isLoading = false;
            },
           (err) => {
               console.log(err);
               let self = this;
                this.error = err;
                if(this.error.json().error == "invalid_token"){
                    this.auth.setNewToken().then(function(res){
                        self.securityOnorOff().subscribe((data)=>{
                           console.log(data);
                            self.forLoading = true;
                            self.isLoading = false;
                       })
                    })
                }
                  else
                {
                  this.forLoading = true;
                  this.isLoading = false;
                  }
            });
    }
      securityOnorOff() {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let options = new RequestOptions({
            headers: headers
        });
        let disableMode="";
        if(this.securityOn==true)
        {
            disableMode="enabled";
        }
        else
        {
            disableMode="disabled";
        }
        if(this.forLoading == false){
         this.isLoading = true;
      }
        // let on = onof == true ? "switch" : "switch"
        // let switchon = onof == true ? "ON" : "OFF"
           let data= 
           {
                "configurations": 
                      [
                          {
                            "name": "security_mode",
                            "value":disableMode
                           }
                       ]
          } ;

          console.log(data);
        let url2 = this.configUrl.apiPath+'/cpi/accounts/configurations';
             return this._http
                .post(url2, data, options)
                .map(res => res);
       
    }
          fetchsecurityOnorOff() {
        let headers = new Headers();  
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer "+this.auth.getToken());
        let options = new RequestOptions({
            headers: headers
        });


        let url2 = this.configUrl.apiPath+'/cpi/accounts/configurations';
             return this._http
                .get(url2,options)
                .map(res => res.json());
       
    }
}
