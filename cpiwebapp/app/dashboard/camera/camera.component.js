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
var nav_service_1 = require('./../../services/nav.service');
var auth_service_1 = require('./../../services/auth.service');
var config_service_1 = require('./../../services/config.service');
var http_1 = require('@angular/http');
var CameraComponent = (function () {
    function CameraComponent(nav, _http, configUrl, auth) {
        this.nav = nav;
        this._http = _http;
        this.configUrl = configUrl;
        this.auth = auth;
        this.allWidgets = [];
        this.widgets = [];
        this.isLoading = false;
    }
    CameraComponent.prototype.ngOnInit = function () {
        this.videoCamera = document.querySelector("#videoCamera");
        this.cameraName = document.querySelector(".cameraNameStream");
        this.videoCamera.src = "../../../assets/img/dummyvidlarge.png";
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
    };
    CameraComponent.prototype.showVideo = function (e) {
        console.log(e.target);
        if (e.target.closest('a').querySelector('.thumbImg').src.indexOf('dummyvid.png') >= 0) {
            this.cameraName.innerHTML = e.target.closest('a').querySelector('.cameraName').innerHTML;
        }
        else {
            this.cameraName.innerHTML = e.target.closest('a').querySelector('.cameraName').innerHTML;
        }
        this.videoCamera.src = "http://10.22.20.223/axis-cgi/mjpg/video.cgi";
    };
    CameraComponent.prototype.changeStyle = function (e) {
        e.target.closest('a').querySelector('.view').style.visibility = "visible";
        e.target.closest('a').querySelector('.view').style.opacity = "1";
        // e.target.closest('a').querySelector('.otherImg').style.display="none";
    };
    CameraComponent.prototype.changeStyleOut = function (e) {
        e.target.closest('a').querySelector('.view').style.visibility = "hidden";
        e.target.closest('a').querySelector('.view').style.opacity = "0";
        // e.target.closest('a').querySelector('.otherImg').style.display="block";
    };
    CameraComponent = __decorate([
        core_1.Component({
            selector: 'camera-cmp',
            moduleId: module.id,
            templateUrl: 'camera.component.html'
        }), 
        __metadata('design:paramtypes', [nav_service_1.NavService, http_1.Http, config_service_1.ConfigService, auth_service_1.AuthService])
    ], CameraComponent);
    return CameraComponent;
}());
exports.CameraComponent = CameraComponent;
//# sourceMappingURL=camera.component.js.map