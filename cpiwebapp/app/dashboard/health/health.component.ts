import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import initDemo = require('../../../assets/js/charts.js');
import { NavService } from '../../services/nav.service';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { ConfigService } from './../../services/config.service';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

declare var $:any;

@Component({
    selector: 'health-cmp',
    moduleId: module.id,
    templateUrl: 'health.component.html'
})

export class HealthComponent implements OnInit{
    alert:any;
     healthInfo:any={};
     mainPanel:any;
     loggedPerson: any = localStorage.getItem("uname");
     showPersonDetails:any="Family Wellness";
    constructor(private nav:NavService, private _http: Http, private configUrl: ConfigService,
    private auth: AuthService,private anim: AuthService, private _router: Router){}
    ngOnInit()
        {
          this.auth.isShowDemo = false;

        this.healthInfo.dob="10";
        this.healthInfo.mob="05";
        this.healthInfo.yob="1991";
        this.healthInfo.weight="99lbs";
        this.healthInfo.heightHealthFt="5 ft";
        this.healthInfo.heightHealthIn="09 In";
         this.healthInfo.heartBeat="90bpm";
          this.healthInfo.sleepBeat="08 Hour";

          // this.mainPanel=document.querySelector('.main-panel');
          //    if(this.mainPanel){
          //       this.mainPanel.style.width="100%";
          //   }

        }
         logout(){
         this.auth.setLogout();
          this._router.navigate(['login']);
    }
    personDetails(personName)
    {
      if(personName==1)
      {
        this.showPersonDetails="Mr Dave's Family Wellness";
      }
      else if(personName==2)
      {
        this.showPersonDetails="Mr Guy's Family Wellness";
      }
      else if(personName==3)
      {
        this.showPersonDetails="My Cameron's Family Wellness";
      }
      else if(personName==4)
      {
        this.showPersonDetails="Mr David's Family Wellness";
      }
    }
 

}
