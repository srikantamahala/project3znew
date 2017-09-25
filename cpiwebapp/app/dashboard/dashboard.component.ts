import { Component,OnInit } from '@angular/core';
import { ConfigService } from './../services/config.service';
import { AuthService } from './../services/auth.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent{
	// private _setIntervalHandler: any;
	// alert:any;
	// alertPop:any;
	// constructor( private configUrl: ConfigService,private auth: AuthService,private _http: Http)
	// {
	// 	alert('hey');
	// }

	//  ngOnInit(){
 // 	   this.alertPop=document.querySelector(".alertPopup");
 // 	   let self=this;
	//  	this.getAlertData().subscribe(
 //            (data) => {
 //                this.checkDataChange(self,data);
 //            },
 //            (err) => {
 //            	let data=[];
 //            	console.log(err);
 //            	this.checkDataChange(self,data);
 //             //    let self = this;
 //             //    this.error = err;
 //             //    this.handleErrorCode(this.error);
 //             //    if(this.error.json().error == "invalid_token"){
 //             //        this.auth.setNewToken().then(function(res){
 //             //            self.getLocationDevices(locationid).subscribe((data)=>{
 //             //                self.isLoading = false;
 //             //                self.forLoading = true;
 //             //                self.showLocationData(data);
 //             //            })
 //             //        })
                
 //             //    }
 //            });
	//  }
	//  showPopup()
	//  {

	//  }
	//  checkDataChange(self,data)
	//  {
	//  	 console.log(self,data);
	//  	// let self=this;
 //                        this._setIntervalHandler = setInterval(function() {
 //                            if(self.configUrl.autoRefresh == false){
 //                                clearInterval(self._setIntervalHandler);
 //                            }
 //                                self.alertPop.style.display="flex";
 //                            	self.configUrl.autoRefresh=false;
 //                        }, 600);
	//  }
 //     getAlertData(){
 //     	alert('hello');
 //        let headers = new Headers();  
 //        headers.append('Authorization', "bearer "+this.auth.getToken());
 //        let params = "includeState=true&includeCapability=true";
 //        let options = new RequestOptions({
 //            headers: headers
 //        });
 //      //this.isLoading = true;

 //      return this._http.get(this.configUrl.apiPath+'/cpi/devices/7', options)
 //         .map((response: Response)=> response.json())
 //    }
}
