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
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var config_service_1 = require('./../../services/config.service');
var auth_service_1 = require('./../../services/auth.service');
var HomeComponent = (function () {
    function HomeComponent(nav, _http, configUrl, auth, anim) {
        this.nav = nav;
        this._http = _http;
        this.configUrl = configUrl;
        this.auth = auth;
        this.anim = anim;
        this.allWidgets = [];
        this.widgets = [];
        this.isLoading = false;
        this.flagFirePop = false;
        this.flagDoorPop = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.alert = document.querySelector(".alertPopup");
        this.alertPopupWrapper = document.querySelector(".alertPopupWrapper");
        this.cameraPopupWrapper = document.querySelector(".cameraPopupWrapper");
        this.alertPopupDoor = document.querySelector(".alertPopupDoor");
        // initDemo();
        this.showData();
        //this.showAlertData();
        sessionStorage.setItem("popupData", "");
        sessionStorage.setItem("popupDataDoor", "");
        if (this.configUrl.autoRefresh == true) {
            var self_1 = this;
            self_1._setIntervalHandler = setInterval(function () {
                if (sessionStorage.getItem("popupData") == undefined && sessionStorage.getItem("popupDataDoor") == undefined) {
                    clearInterval(self_1._setIntervalHandler);
                }
                else {
                    //clearInterval(self._setIntervalHandler);
                    self_1.showAlertData();
                }
            }, 10000);
        }
    };
    // ngOnDestroy() {
    //      clearInterval(this._setIntervalHandler);
    //   }
    HomeComponent.prototype.getData = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var params = "includeState=true&includeCapability=true";
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        this.isLoading = true;
        return this._http.get(this.configUrl.apiPath + '/cpi/devices/profiles', options)
            .map(function (response) { return response.json(); });
    };
    HomeComponent.prototype.showData = function () {
        var _this = this;
        var arr = [];
        var lwidget = {};
        this.getData().subscribe(function (res) {
            _this.isLoading = false;
            _this.widgets = res;
            _this.widgetNumber = _this.widgets.length;
        }, function (err) {
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.getData().subscribe(function (data) {
                        self.isLoading = false;
                        self.widgets = data;
                        self.widgetNumber = self.widgets.length;
                    });
                });
            }
        });
    };
    HomeComponent.prototype.showAlertData = function () {
        var _this = this;
        var self = this;
        this.getAlertData().subscribe(function (data) {
            _this.checkDataChange(self, data);
        }, function (err) {
            var data = [];
            _this.flagFirePop = false;
            console.log(err);
            //this.checkDataChange(self,data);
        });
        Rx_1.Observable.forkJoin(this.getAlertDataForDoor(), this.getAlertDataForConfig()).subscribe(function (data) {
            _this.checkDataChangeForDoor(self, data);
        }, function (err) {
            var data = [];
            _this.flagDoorPop = false;
            console.log(err);
            //this.checkDataChange(self,data);
        });
    };
    HomeComponent.prototype.checkDataChangeForDoor = function (self, data) {
        var configValue = "";
        if (data[1]) {
            for (var i = 0; i < data[1].length; i++) {
                if (data[1][i].name == "security_mode")
                    configValue = data[1][i].value;
            }
            var jsonPopup = {
                "ten": data[0].state,
                "config": configValue,
            };
            sessionStorage.setItem("popupDataDoor", JSON.stringify(jsonPopup));
            var doorPopup = JSON.parse(sessionStorage.getItem("popupDataDoor"));
            console.log(doorPopup);
            if (doorPopup != undefined && JSON.parse(doorPopup.ten) && doorPopup.config) {
                var devTen = JSON.parse(doorPopup.ten).status, deviceConfig = doorPopup.config;
                console.log('devTen', devTen);
                console.log('deviceConfig', deviceConfig);
                if (devTen.toLowerCase() == "opened" && deviceConfig.toLowerCase() == "enabled") {
                    self.flagDoorPop = true;
                    // if(self.alert.style.display!="flex"){
                    if (self.cameraPopupWrapper.style.display != "block") {
                        self.alertPopupWrapper.style.display = "none";
                        self.alertPopupDoor.style.display = "block";
                        self.alert.style.display = "flex";
                    }
                }
                else {
                    self.flagDoorPop = false;
                    //   self.cameraPopupWrapper.style.display="none";
                    self.alertPopupDoor.style.display = "none";
                }
            }
            else {
                self.flagDoorPop = false;
                //self.alert.style.display="none";
                //self.cameraPopupWrapper.style.display="none";
                self.alertPopupDoor.style.display = "none";
            }
        }
        else {
            self.flagDoorPop = false;
            // self.alert.style.display="none";
            //self.cameraPopupWrapper.style.display="none";
            self.alertPopupDoor.style.display = "none";
        }
        if (self.cameraPopupWrapper.style.display != "block") {
            if (self.flagDoorPop == false && self.flagFirePop == false) {
                self.alert.style.display = "none";
            }
            else {
                if (self.alert.style.display != "flex") {
                    self.alert.style.display = "flex";
                }
            }
        }
    };
    HomeComponent.prototype.checkDataChange = function (self, data) {
        console.log(data);
        var configValue = "";
        if (data.state) {
            sessionStorage.setItem("popupData", JSON.stringify(data.state));
            var newDataPopup = JSON.parse(sessionStorage.getItem("popupData"));
            console.log(newDataPopup);
            if (newDataPopup != undefined && JSON.parse(newDataPopup).status) {
                if (JSON.parse(newDataPopup).status.toLowerCase() == "detected") {
                    self.flagFirePop = true;
                    // if(self.alert.style.display!="flex"){
                    //self.cameraPopupWrapper.style.display="none";
                    if (self.cameraPopupWrapper.style.display == "none") {
                        self.alertPopupDoor.style.display = "none";
                        self.alertPopupWrapper.style.display = "block";
                        self.alert.style.display = "flex";
                    }
                }
                else {
                    self.flagFirePop = false;
                    //self.alert.style.display="none";
                    //self.cameraPopupWrapper.style.display="none";
                    self.alertPopupWrapper.style.display = "none";
                }
            }
            else {
                self.flagFirePop = false;
                //self.alert.style.display="none";
                // self.cameraPopupWrapper.style.display="none";
                self.alertPopupWrapper.style.display = "none";
            }
        }
        else {
            self.flagFirePop = false;
            // self.cameraPopupWrapper.style.display="none";
            self.alertPopupWrapper.style.display = "none";
        }
        console.log('self.flagDoorPop', self.flagDoorPop);
        console.log('self.flagFirePop', self.flagFirePop);
        if (self.cameraPopupWrapper.style.display == "none") {
            if (self.flagDoorPop == false && self.flagFirePop == false) {
                self.alert.style.display = "none";
            }
            else {
                if (self.alert.style.display != "flex") {
                    self.alert.style.display = "flex";
                }
            }
        }
    };
    HomeComponent.prototype.getAlertData = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', "bearer " + this.auth.getToken());
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({
            headers: headers
        });
        //this.isLoading = true;
        return this._http.get(this.configUrl.apiPath + '/cpi/devices/7/state', options)
            .map(function (response) { return response.json(); });
    };
    HomeComponent.prototype.getAlertDataForDoor = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var options = new http_1.RequestOptions({
            headers: headers
        });
        //this.isLoading = true;
        return this._http.get(this.configUrl.apiPath + '/cpi/devices/10/state', options)
            .map(function (response) { return response.json(); });
    };
    HomeComponent.prototype.getAlertDataForConfig = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var options = new http_1.RequestOptions({
            headers: headers
        });
        //this.isLoading = true;
        return this._http.get(this.configUrl.apiPath + '/cpi/accounts/configurations', options)
            .map(function (response) { return response.json(); });
    };
    HomeComponent.prototype.setBack = function () {
        this.nav.isGoBack = true;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-cmp',
            moduleId: module.id,
            templateUrl: 'home.component.html'
        }), 
        __metadata('design:paramtypes', [nav_service_1.NavService, http_1.Http, config_service_1.ConfigService, auth_service_1.AuthService, auth_service_1.AuthService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map