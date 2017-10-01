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
var http_1 = require('@angular/http');
var config_service_1 = require('./../../services/config.service');
var router_1 = require('@angular/router');
var auth_service_1 = require('./../../services/auth.service');
var UserComponent = (function () {
    function UserComponent(_http, auth, router, route, configUrl) {
        this._http = _http;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.configUrl = configUrl;
        this.isLoading = false;
        this.forLoading = false;
        this.loggedPerson = localStorage.getItem("uname");
        this.toPeakVal = "";
        this.frPeakVal = "";
        this.toPeakOffVal = "";
        this.frPeakOffVal = "";
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.isShowDemo = false;
        // this.mainPanel=document.querySelector('.main-panel');
        //  if(this.mainPanel){
        //     this.mainPanel.style.width="100%";
        //   }
        this.fetchsecurityOnorOff().subscribe(function (data) {
            _this.isLoading = false;
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == "security_mode")
                        if (data[i].value == "enabled") {
                            _this.securityOn = true;
                        }
                        else {
                            _this.securityOn = false;
                        }
                }
            }
            else {
                _this.securityOn = false;
            }
        }, function (err) {
            console.log(err);
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.fetchsecurityOnorOff().subscribe(function (data) {
                        console.log(data);
                        if (data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].name == "security_mode")
                                    if (data[i].value == "enabled") {
                                        self.securityOn = true;
                                    }
                                    else {
                                        self.securityOn = false;
                                    }
                            }
                        }
                        else {
                            self.securityOn = false;
                        }
                    });
                });
            }
            else {
                _this.securityOn = false;
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
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.auth.isShowDemo = false;
        clearInterval(this._setIntervalHandlerThermo);
    };
    UserComponent.prototype.resetPeakHour = function () {
        this.toPeakVal = "";
        this.frPeakVal = "";
        this.toPeakOffVal = "";
        this.frPeakOffVal = "";
    };
    UserComponent.prototype.repeatPeakHours = function () {
        var _this = this;
        this.getPeakHours().subscribe(function (res) {
            _this.manipulatePeakHours(res);
        }, function (err) {
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.getPeakHours().subscribe(function (data) {
                        self.forLoading = true;
                        self.isLoading = false;
                        self.manipulatePeakHours(data);
                    });
                });
            }
            else {
                _this.forLoading = true;
                _this.isLoading = false;
            }
        });
    };
    UserComponent.prototype.manipulatePeakHours = function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == "peak_hours") {
                    var value = data[i].value, hyphenIndex = value.indexOf('-'), length_1 = data[i].value.length;
                    if (hyphenIndex >= 0 && length_1 > 0) {
                        this.toPeakVal = value.substring(hyphenIndex + 1, value.length);
                        this.frPeakVal = value.substring(0, hyphenIndex);
                    }
                }
                else if (data[i].name == "off_peak_hours") {
                    var value = data[i].value, hyphenIndex = value.indexOf('-'), length_2 = data[i].value.length;
                    if (hyphenIndex >= 0 && length_2 > 0) {
                        this.toPeakOffVal = value.substring(hyphenIndex + 1, value.length);
                        this.frPeakOffVal = value.substring(0, hyphenIndex);
                    }
                }
            }
        }
    };
    UserComponent.prototype.savePeakHour = function () {
        var _this = this;
        this.peakHour().subscribe(function (data) {
            console.log(data);
            _this.forLoading = true;
            _this.isLoading = false;
        }, function (err) {
            console.log(err);
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.peakHour().subscribe(function (data) {
                        console.log(data);
                        self.forLoading = true;
                        self.isLoading = false;
                    });
                });
            }
            else {
                _this.forLoading = true;
                _this.isLoading = false;
            }
        });
    };
    UserComponent.prototype.peakHour = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var options = new http_1.RequestOptions({
            headers: headers
        });
        if (this.forLoading == false) {
            this.isLoading = true;
        }
        var peakOn = this.frPeakVal + '-' + this.toPeakVal, peakOff = this.frPeakOffVal + '-' + this.toPeakOffVal;
        // let on = onof == true ? "switch" : "switch"
        // let switchon = onof == true ? "ON" : "OFF"
        var data = {
            "configurations": [{
                    "name": "peak_hours",
                    "value": peakOn
                },
                {
                    "name": "off_peak_hours",
                    "value": peakOff
                }
            ]
        };
        console.log(data);
        var url2 = this.configUrl.apiPath + '/cpi/accounts/configurations';
        return this._http.post(url2, data, options).map(function (res) { return res; });
    };
    UserComponent.prototype.getPeakHours = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var options = new http_1.RequestOptions({
            headers: headers
        });
        var url2 = this.configUrl.apiPath + '/cpi/accounts/configurations';
        return this._http
            .get(url2, options)
            .map(function (res) { return res.json(); });
    };
    UserComponent.prototype.logout = function () {
        this.auth.setLogout();
        this.router.navigate(['login']);
    };
    UserComponent.prototype.showOnorOff = function () {
        var _this = this;
        this.securityOnorOff().subscribe(function (data) {
            console.log(data);
            _this.forLoading = true;
            _this.isLoading = false;
        }, function (err) {
            console.log(err);
            var self = _this;
            _this.error = err;
            if (_this.error.json().error == "invalid_token") {
                _this.auth.setNewToken().then(function (res) {
                    self.securityOnorOff().subscribe(function (data) {
                        console.log(data);
                        self.forLoading = true;
                        self.isLoading = false;
                    });
                });
            }
            else {
                _this.forLoading = true;
                _this.isLoading = false;
            }
        });
    };
    UserComponent.prototype.securityOnorOff = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var options = new http_1.RequestOptions({
            headers: headers
        });
        var disableMode = "";
        if (this.securityOn == true) {
            disableMode = "enabled";
        }
        else {
            disableMode = "disabled";
        }
        if (this.forLoading == false) {
            this.isLoading = true;
        }
        // let on = onof == true ? "switch" : "switch"
        // let switchon = onof == true ? "ON" : "OFF"
        var data = {
            "configurations": [
                {
                    "name": "security_mode",
                    "value": disableMode
                }
            ]
        };
        console.log(data);
        var url2 = this.configUrl.apiPath + '/cpi/accounts/configurations';
        return this._http
            .post(url2, data, options)
            .map(function (res) { return res; });
    };
    UserComponent.prototype.fetchsecurityOnorOff = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "bearer " + this.auth.getToken());
        var options = new http_1.RequestOptions({
            headers: headers
        });
        var url2 = this.configUrl.apiPath + '/cpi/accounts/configurations';
        return this._http
            .get(url2, options)
            .map(function (res) { return res.json(); });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user-cmp',
            moduleId: module.id,
            templateUrl: 'user.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute, config_service_1.ConfigService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map