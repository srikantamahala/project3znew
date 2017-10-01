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
var auth_service_1 = require('./../../services/auth.service');
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
var HomelocationComponent = (function () {
    function HomelocationComponent(nav, _http, configUrl, auth, _router) {
        this.nav = nav;
        this._http = _http;
        this.configUrl = configUrl;
        this.auth = auth;
        this._router = _router;
        this.hideAll = false;
        this.isLoading = false;
        this.forLoading = false;
        this.loggedPerson = localStorage.getItem("uname");
        this.flagFirePop = false;
        this.flagDoorPop = false;
        this.dataIndividual = {};
        this.mapping = {};
        this.showWidgetType = "";
    }
    HomelocationComponent.prototype.ngOnInit = function () {
        this.tvBulb = "10004";
        this.thermostatBulb = "10000"; //window bulb
        this.bedroomWhiteBulb = "10002";
        this.bedroomColorBulb = "10006";
        this.kitchenBulb = "10005";
        this.diningTableBulb = "10003";
        this.balconyBulb = "10001"; //camera
        this.mapping =
            {
                "tvBulb": "Color Strip  In Hall",
                "thermostatBulb": "Color Bulb  In Hall",
                "bedroomWhiteBulb": "Color Bulb For Bedroom 1",
                "bedroomColorBulb": "White Bulb For Bedroom 2",
                "kitchenBulb": "White Bulb In Kitchen",
                "diningTableBulb": "While Bulb For Dining Table",
                "balconyBulb": "Color Bulb Near Camera",
            };
        this.alert = document.querySelector(".alertPopup");
        this.alertPopupWrapper = document.querySelector(".alertPopupWrapper");
        this.cameraPopupWrapper = document.querySelector(".cameraPopupWrapper");
        this.alertPopupDoor = document.querySelector(".alertPopupDoor");
        this.mainPanel = document.querySelector('.main-panel');
        if (this.mainPanel) {
            this.mainPanel.style.width = "100%";
        }
        this.auth.isShowDemo = true;
        this.showData();
        sessionStorage.setItem("popupData", "");
        sessionStorage.setItem("popupDataDoor", "");
        if (this.configUrl.autoRefresh == true) {
            var self_1 = this;
            this._setIntervalHandler = setInterval(function () {
                if (sessionStorage.getItem("popupData") == undefined) {
                    clearInterval(self_1._setIntervalHandler);
                }
                else {
                    self_1.showAlertData();
                }
            }, 10000);
            this._setIntervalHandlerBulb = setInterval(function () {
                if (sessionStorage.getItem("stateDataTotal") == undefined) {
                    clearInterval(self_1._setIntervalHandlerBulb);
                }
                else {
                    self_1.showData();
                }
            }, 5000);
        }
    };
    HomelocationComponent.prototype.showBulbName = function () {
        return ((this.showWidgetType && this.mapping[this.showWidgetType])
            ? this.mapping[this.showWidgetType] : '');
    };
    HomelocationComponent.prototype.showProfilePopup = function (dataIndividual) {
        dataIndividual.showProfile = true;
    };
    HomelocationComponent.prototype.showPublicProfile = function (type) {
        return type == "PUBLIC";
    };
    HomelocationComponent.prototype.backToControls = function (dataIndividual) {
        dataIndividual.showProfile = false;
    };
    HomelocationComponent.prototype.ngOnDestroy = function () {
        this.auth.isShowDemo = false;
        clearInterval(this._setIntervalHandlerBulb);
    };
    HomelocationComponent.prototype.goPreviousView = function () {
        this.auth.isShowDemo = false;
        //this._router.navigate(['dashboard']);
        //window.history.back();
    };
    HomelocationComponent.prototype.iconBackgroundColor = function (brandName) {
        var backgroundColor;
        if (brandName && brandName.indexOf("Philips") > -1) {
            backgroundColor = "#000";
        }
        if (brandName && brandName.indexOf("Insteon") > -1) {
            backgroundColor = "#0eb5ca";
        }
        return backgroundColor;
    };
    HomelocationComponent.prototype.logout = function () {
        this.auth.setLogout();
        this._router.navigate(['login']);
    };
    HomelocationComponent.prototype.deviceIcon = function (deviceId, thisDeviceType) {
        var data = JSON.parse(sessionStorage.getItem("stateDataTotal")), dataForIcon = { 'deviceType': '', 'brandName': '' };
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].deviceId == deviceId) {
                    dataForIcon = data[i];
                }
            }
        }
        return data ? (thisDeviceType.indexOf(dataForIcon.deviceType) >= 0 && thisDeviceType.indexOf(dataForIcon.brandName) >= 0) : false;
    };
    HomelocationComponent.prototype.bulbonOff = function (deviceId) {
        var data = JSON.parse(sessionStorage.getItem("stateDataTotal")), bulbOnOff = false;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].deviceId == deviceId) {
                    if (data[i].state.on == true) {
                        bulbOnOff = true;
                        break;
                    }
                    else {
                        bulbOnOff = false;
                        break;
                    }
                }
            }
        }
        return bulbOnOff;
    };
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
    HomelocationComponent.prototype.checkCapable = function (capablelist, capable) {
        var capablelistItems = [];
        for (var i = 0; i < capablelist.length; i++) {
            capablelistItems.push(capablelist[i].capabilityName);
        }
        if (capablelistItems.indexOf(capable) > -1) {
            return true;
        }
    };
    HomelocationComponent.prototype.showControl = function (i) {
        return i == this.showIndex;
    };
    HomelocationComponent.prototype.cancelWidget = function () {
        this.showWidgetType = "";
        this.dataIndividual = {};
    };
    HomelocationComponent.prototype.showThermostatPopupCheck = function () {
        if (this.showWidgetType == 'thermostat') {
            return true;
        }
        else {
            return false;
        }
    };
    HomelocationComponent.prototype.showThermostatPopup = function (type, id) {
        this.showWidgetType = type;
        var data = JSON.parse(sessionStorage.getItem("stateDataTotal"));
        for (var i = 0; i < data.length; i++) {
            if (data[i].deviceId == id) {
                this.dataIndividual = data[i];
                break;
            }
        }
        console.log(this.dataIndividual.deviceProfile);
    };
    HomelocationComponent.prototype.showPopupCheck = function () {
        console.log(this.dataIndividual);
        if (Object.keys(this.dataIndividual).length == 0) {
            return false;
        }
        else {
            if (this.showWidgetType != 'camera' && this.showWidgetType != 'thermostat') {
                return true;
            }
            else {
                return false;
            }
        }
    };
    HomelocationComponent.prototype.showCameraPopupCheck = function () {
        if (this.showWidgetType == 'camera') {
            return true;
        }
        else {
            return false;
        }
    };
    HomelocationComponent.prototype.showCameraPopup = function (type) {
        this.showWidgetType = type;
        this.dataIndividual = {};
    };
    HomelocationComponent.prototype.showPopup = function (type, id) {
        this.showWidgetType = type;
        var data = JSON.parse(sessionStorage.getItem("stateDataTotal"));
        for (var i = 0; i < data.length; i++) {
            if (data[i].deviceId == id) {
                this.dataIndividual = data[i];
                break;
            }
        }
        console.log('this.dataIndividual', this.dataIndividual);
        //this.showWidgetType=type;
    };
    HomelocationComponent.prototype.deviceName = function (name) {
        var name = name.substring(0, 14);
        return name;
    };
    HomelocationComponent.prototype.popupstyle = function () {
        this.classForBulb = document.querySelector('.' + this.showWidgetType);
        var obj = {};
        if (this.classForBulb) {
            var leftPopup = parseInt(this.classForBulb.offsetLeft) != NaN ? ((parseInt(this.classForBulb.offsetLeft) + 2)) : "10", topPopup = parseInt(this.classForBulb.offsetTop) != NaN ? ((parseInt(this.classForBulb.offsetTop))) : "10";
            obj = { "left": leftPopup + 'px', "top": topPopup + 'px', "cursor": "pointer", "position": "absolute" };
        }
        else {
            obj = { "left": "10px", "top": "10px", "cursor": "pointer", "position": "absolute" };
        }
        return obj;
    };
    HomelocationComponent.prototype.getData = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var params = "includeState=true&includeCapability=true";
        //let params = "includeState=true";
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        if (this.forLoading == false) {
            this.isLoading = true;
        }
        return this._http.get(this.configUrl.apiPath + '/cpi/devices/profiles', options)
            .map(function (response) { return response.json(); });
    };
    HomelocationComponent.prototype.generateObj = function (devicename, widgets) {
        var deviceId = widgets.deviceId, deviceType = widgets.deviceType;
        this.keyname = devicename.concat(deviceType).concat(deviceId);
        console.log(devicename);
        console.log(deviceId);
        console.log(deviceType);
        return this.keyname;
    };
    HomelocationComponent.prototype.showTemplateData = function (res) {
        var arr = [], arrTot = [];
        var arrObj = [];
        this.widgets = res;
        for (var i = 0; i < this.widgets.length; i++) {
            if (this.widgets[i].state != "No State In CPI ") {
                this.widgets[i].state = JSON.parse(this.widgets[i].state);
                this.widgets[i].state.brightness = this.widgets[i].state.brightness == null ? 0 : this.widgets[i].state.brightness;
                this.widgets[i].state.saturation = this.widgets[i].state.saturation == null ? 0 : this.widgets[i].state.saturation;
                this.widgets[i].showProfile = false;
                if (this.widgets[i].state.on == "false") {
                    this.widgets[i].state.on = false;
                }
                else if (this.widgets[i].state.on == "true") {
                    this.widgets[i].state.on = true;
                }
                for (var j = 0; j < this.widgets[i].deviceProfile.length; j++) {
                    if (this.widgets[i].deviceProfile[j].name == "brand" || this.widgets[i].deviceProfile[j].name == "Brand") {
                        this.widgets[i].brandName = this.widgets[i].deviceProfile[j].value;
                    }
                    if (this.widgets[i].deviceProfile[j].name == "brand") {
                        this.widgets[i].keyname = this.generateObj(this.widgets[i].deviceProfile[j].value, this.widgets[i]);
                    }
                }
            }
            else {
                this.widgets[i].state = {};
                this.widgets[i].state.on = true;
                this.widgets[i].state.brightness = 0;
                this.widgets[i].state.saturation = 0;
                this.widgets[i].state.hue = 1000;
                this.widgets[i].state.reachable = "true";
                this.widgets[i].showProfile = false;
                for (var j = 0; j < this.widgets[i].deviceProfile.length; j++) {
                    if (this.widgets[i].deviceProfile[j].name == "brand" || this.widgets[i].deviceProfile[j].name == "Brand") {
                        this.widgets[i].brandName = this.widgets[i].deviceProfile[j].value;
                    }
                    if (this.widgets[i].deviceProfile[j].name == "brand") {
                        this.widgets[i].keyname = this.generateObj(this.widgets[i].deviceProfile[j].value, this.widgets[i]);
                    }
                }
            }
            arr.push(this.widgets[i].state);
            arrTot.push(this.widgets[i]);
        }
        console.log(arr);
        //arrObj
        var totalArray = "";
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
    };
    HomelocationComponent.prototype.showData = function () {
        var _this = this;
        this.getData().subscribe(function (res) {
            console.log(res);
            _this.forLoading = true;
            _this.isLoading = false;
            _this.showTemplateData(res);
        }, function (err) {
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.getData().subscribe(function (data) {
                        self.forLoading = true;
                        self.isLoading = false;
                        self.showTemplateData(data);
                    });
                });
            }
            else {
                _this.forLoading = true;
                _this.isLoading = false;
            }
        });
    };
    HomelocationComponent.prototype.putOnorOff = function (onof, deviceId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var params = "userName=" + localStorage.getItem("uname");
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        var on = onof == true ? "switch" : "switch";
        var switchon = onof == true ? "ON" : "OFF";
        var data = {
            "deviceId": deviceId,
            "actionType": on,
            "command": switchon
        };
        var url2 = this.configUrl.apiPath + '/cpi/commands';
        return this._http
            .post(url2, data, options)
            .map(function (res) { return res.json(); });
    };
    HomelocationComponent.prototype.showOnorOff = function (onof, deviceId) {
        var _this = this;
        this.putOnorOff(onof, deviceId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.putOnorOff(onof, deviceId).subscribe(function (data) {
                        console.log(data);
                    });
                });
            }
        });
    };
    HomelocationComponent.prototype.putChangeColor = function (color, deviceId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var params = "userName=" + localStorage.getItem("uname");
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        var data = {
            "deviceId": deviceId,
            "actionType": "hue",
            "command": color.toString()
        };
        var url = this.configUrl.apiPath + '/cpi/commands';
        return this._http
            .post(url, data, options)
            .map(function (res) { return res.json(); });
    };
    HomelocationComponent.prototype.showChangeColor = function (color, deviceId) {
        var _this = this;
        this.putChangeColor(color, deviceId).subscribe(function (data) { return _this.data = data; }, function (err) {
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.putChangeColor(color, deviceId).subscribe(function (data) {
                        console.log(data);
                    });
                });
            }
        });
    };
    HomelocationComponent.prototype.putChangeBrightness = function (bright, deviceId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var params = "userName=" + localStorage.getItem("uname");
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        var data = {
            "deviceId": deviceId,
            "actionType": "brightness",
            "command": bright.toString()
        };
        var url = this.configUrl.apiPath + '/cpi/commands';
        //let url1 = 'http://jsonplaceholder.typicode.com/posts/1';
        return this._http
            .post(url, data, options)
            .map(function (res) { return res.json(); });
    };
    HomelocationComponent.prototype.showChangeBrightness = function (bright, deviceId) {
        var _this = this;
        this.putChangeBrightness(bright, deviceId).subscribe(function (data) { return _this.data = data; }, function (err) {
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.putChangeBrightness(bright, deviceId).subscribe(function (data) {
                        console.log(data);
                    });
                });
            }
        });
    };
    HomelocationComponent.prototype.putChangeSaturation = function (saturation, deviceId) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var params = "userName=" + localStorage.getItem("uname");
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        var data = {
            "deviceId": deviceId,
            "actionType": "saturation",
            "command": saturation.toString()
        };
        var url = this.configUrl.apiPath + '/cpi/commands';
        //let url1 = 'http://jsonplaceholder.typicode.com/posts/1';
        return this._http
            .post(url, data, options)
            .map(function (res) { return res.json(); });
    };
    HomelocationComponent.prototype.showChangeSaturation = function (saturation, deviceId) {
        var _this = this;
        this.putChangeSaturation(saturation, deviceId).subscribe(function (data) { return _this.data = data; }, function (err) {
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.putChangeSaturation(saturation, deviceId).subscribe(function (data) {
                        console.log(data);
                    });
                });
            }
        });
    };
    HomelocationComponent.prototype.showAlertData = function () {
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
    HomelocationComponent.prototype.checkDataChangeForDoor = function (self, data) {
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
    HomelocationComponent.prototype.checkDataChange = function (self, data) {
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
    HomelocationComponent.prototype.getAlertData = function () {
        var headers = new http_1.Headers();
        var params = "includeState=true";
        headers.append('Authorization', "bearer " + this.auth.getToken());
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        //this.isLoading = true;
        return this._http.get(this.configUrl.apiPath + '/cpi/devices/7', options)
            .map(function (response) { return response.json(); });
    };
    HomelocationComponent.prototype.getAlertDataForDoor = function () {
        var headers = new http_1.Headers();
        var params = "includeState=true";
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var options = new http_1.RequestOptions({
            headers: headers,
            search: new http_1.URLSearchParams(params)
        });
        //this.isLoading = true;
        return this._http.get(this.configUrl.apiPath + '/cpi/devices/10', options)
            .map(function (response) { return response.json(); });
    };
    HomelocationComponent.prototype.getAlertDataForConfig = function () {
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
    HomelocationComponent = __decorate([
        core_1.Component({
            selector: 'homelocation-cmp',
            moduleId: module.id,
            templateUrl: 'homelocation.component.html',
            animations: [
                core_1.trigger('deviceAnimation', [
                    core_1.transition(':enter', [
                        core_1.style({ transform: 'translateY(100%)', opacity: 0 }),
                        core_1.animate('800ms', core_1.style({ transform: 'translateX(0)', 'opacity': 1 }))
                    ])])
            ],
        }), 
        __metadata('design:paramtypes', [nav_service_1.NavService, http_1.Http, config_service_1.ConfigService, auth_service_1.AuthService, router_1.Router])
    ], HomelocationComponent);
    return HomelocationComponent;
}());
exports.HomelocationComponent = HomelocationComponent;
//# sourceMappingURL=homelocation.component.js.map