"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var nav_service_1 = require('../../services/nav.service');
var http_1 = require('@angular/http');
var config_service_1 = require('./../../services/config.service');
var router_1 = require('@angular/router');
var auth_service_1 = require('./../../services/auth.service');
var HealthComponent = (function () {
    function HealthComponent(nav, _http, configUrl, auth, anim, _router) {
        this.nav = nav;
        this._http = _http;
        this.configUrl = configUrl;
        this.auth = auth;
        this.anim = anim;
        this._router = _router;
        this.healthInfo = {};
        this.loggedPerson = localStorage.getItem("uname");
        this.showPersonDetails = "Family Wellness";
    }
    HealthComponent.prototype.ngOnInit = function () {
        this.auth.isShowDemo = false;
        this.healthInfo.dob = "10";
        this.healthInfo.mob = "05";
        this.healthInfo.yob = "1991";
        this.healthInfo.weight = "99lbs";
        this.healthInfo.heightHealthFt = "5 ft";
        this.healthInfo.heightHealthIn = "09 In";
        this.healthInfo.heartBeat = "90bpm";
        this.healthInfo.sleepBeat = "08 Hour";
        // this.mainPanel=document.querySelector('.main-panel');
        //    if(this.mainPanel){
        //       this.mainPanel.style.width="100%";
        //   }
    };
    HealthComponent.prototype.logout = function () {
        this.auth.setLogout();
        this._router.navigate(['login']);
    };
    HealthComponent.prototype.personDetails = function (personName) {
        if (personName == 1) {
            this.showPersonDetails = "Mr Dave's Family Wellness";
        }
        else if (personName == 2) {
            this.showPersonDetails = "Mr Guy's Family Wellness";
        }
        else if (personName == 3) {
            this.showPersonDetails = "My Cameron's Family Wellness";
        }
        else if (personName == 4) {
            this.showPersonDetails = "Mr David's Family Wellness";
        }
    };
    HealthComponent = __decorate([
        core_1.Component({
            selector: 'health-cmp',
            moduleId: module.id,
            templateUrl: 'health.component.html'
        }), 
        __metadata('design:paramtypes', [nav_service_1.NavService, http_1.Http, config_service_1.ConfigService, auth_service_1.AuthService, auth_service_1.AuthService, router_1.Router])
    ], HealthComponent);
    return HealthComponent;
}());
exports.HealthComponent = HealthComponent;
//# sourceMappingURL=health.component.js.map