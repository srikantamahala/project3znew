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
var auth_service_1 = require('./../../services/auth.service');
var router_1 = require('@angular/router');
var PopupComponent = (function () {
    function PopupComponent(router, _http, auth) {
        this.router = router;
        this._http = _http;
        this.auth = auth;
    }
    PopupComponent.prototype.ngOnInit = function () {
        this.alertPop = document.querySelector(".alertPopup");
        this.fadeTarget = document.querySelector(".viewCamera");
        this.viewCameraPopup = document.querySelector("#viewCameraPopup");
        this.viewCameraPopupDoor = document.querySelector("#viewCameraPopupDoor");
        this.fadeTargetDoor = document.querySelector(".viewCameraDoor");
        this.alertPop.querySelector(".cameraPopupWrapper").style.display = "none";
    };
    PopupComponent.prototype.goToCamera = function () {
        var alertPop = this.alertPop;
        //this.alertPop.style.display="none";
        alertPop.querySelector(".alertPopupWrapper").style.display = "none";
        alertPop.querySelector(".alertPopupDoor").style.display = "none";
        alertPop.querySelector(".alertPopupWrapper").style.display = "none";
        //alertPop.querySelector(".cameraPopupWrapper .cameraInPopup").src="http://10.22.20.223/axis-cgi/mjpg/video.cgi";
        alertPop.querySelector(".cameraPopupWrapper .cameraInPopup").src = "https://cpplus.happiestminds.com/axis-cgi/mjpg/video.cgi";
        alertPop.querySelector(".cameraPopupWrapper").style.display = "block";
        // this.cameraStream().subscribe(
        //        (data) => {
        //               console.log(data);
        //           },
        //           (err) => {
        //                console.log(err);
        //           });
        //alertPop.querySelector(".cameraPopupWrapper video").poster="../../../assets/img/cover.jpeg";
        //this.router.navigate(['/camera']);
    };
    PopupComponent.prototype.cancelPopup = function () {
        this.changeStyleOutPopup();
        this.alertPop.style.display = "none";
        this.alertPop.querySelector(".cameraPopupWrapper").style.display = "none";
        this.alertPop.querySelector(".cameraPopupWrapper .cameraInPopup").src = "";
    };
    PopupComponent.prototype.cancelPopupCamera = function () {
        this.changeStyleOutPopup();
        var alertPop = this.alertPop;
        //this.alertPop.style.display="none";
        alertPop.querySelector(".cameraPopupWrapper").style.display = "none";
        alertPop.style.display = "none";
        alertPop.querySelector(".alertPopupWrapper").style.display = "block";
    };
    PopupComponent.prototype.changeStylePopup = function () {
        // e.target.closest('div').querySelector('.viewCamera').style.visibility="visible";
    };
    PopupComponent.prototype.changeStyleOutPopup = function () {
        console.log('out');
        this.fadeTarget.style.color = "#f27700";
        this.fadeTarget.style.opacity = "1";
        this.fadeTarget.style.fontSize = "12px";
        this.viewCameraPopup.style.opacity = "1";
        clearInterval(this.fadeEffect);
        // e.target.closest('div').querySelector('.viewCamera').style.visibility="hidden";
    };
    PopupComponent.prototype.fadeOutEffect = function () {
        console.log('in');
        var fadeTarget = this.fadeTarget;
        var viewCameraPopup = this.viewCameraPopup;
        this.fadeEffect = setInterval(function () {
            if (!fadeTarget.style.fontSize) {
                fadeTarget.style.fontSize = "16px";
            }
            if (fadeTarget.style.fontSize == "16px") {
                fadeTarget.style.fontSize = "12px";
            }
            else {
                fadeTarget.style.fontSize = "16px";
            }
            if (!fadeTarget.style.color) {
                fadeTarget.style.color = "rgb(242, 119, 0)";
            }
            if (fadeTarget.style.color == "rgb(242, 119, 0)") {
                fadeTarget.style.color = "red";
            }
            else {
                fadeTarget.style.color = "rgb(242, 119, 0)";
            }
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity < 0.6) {
                fadeTarget.style.opacity = 1;
            }
            else {
                fadeTarget.style.opacity -= 0.1;
            }
            if (!viewCameraPopup.style.opacity) {
                viewCameraPopup.style.opacity = 1;
            }
            if (viewCameraPopup.style.opacity < 0.8) {
                viewCameraPopup.style.opacity = 1;
            }
            else {
                viewCameraPopup.style.opacity -= 0.1;
            }
        }, 500);
    };
    PopupComponent.prototype.changeStyleOutPopupdoor = function () {
        this.fadeTargetDoor.style.color = "#f27700";
        this.fadeTargetDoor.style.opacity = "1";
        this.fadeTargetDoor.style.fontSize = "12px";
        this.viewCameraPopupDoor.style.opacity = "1";
        clearInterval(this.fadeEffectDoor);
    };
    PopupComponent.prototype.fadeOutEffectDoor = function () {
        var fadeTarget = this.fadeTargetDoor;
        var viewCameraPopup = this.viewCameraPopupDoor;
        this.fadeEffectDoor = setInterval(function () {
            if (!fadeTarget.style.fontSize) {
                fadeTarget.style.fontSize = "16px";
            }
            if (fadeTarget.style.fontSize == "16px") {
                fadeTarget.style.fontSize = "12px";
            }
            else {
                fadeTarget.style.fontSize = "16px";
            }
            if (!fadeTarget.style.color) {
                fadeTarget.style.color = "rgb(242, 119, 0)";
            }
            if (fadeTarget.style.color == "rgb(242, 119, 0)") {
                fadeTarget.style.color = "red";
            }
            else {
                fadeTarget.style.color = "rgb(242, 119, 0)";
            }
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity < 0.6) {
                fadeTarget.style.opacity = 1;
            }
            else {
                fadeTarget.style.opacity -= 0.1;
            }
            if (!viewCameraPopup.style.opacity) {
                viewCameraPopup.style.opacity = 1;
            }
            if (viewCameraPopup.style.opacity < 0.8) {
                viewCameraPopup.style.opacity = 1;
            }
            else {
                viewCameraPopup.style.opacity -= 0.1;
            }
        }, 500);
    };
    PopupComponent = __decorate([
        core_1.Component({
            selector: 'pop-up',
            moduleId: module.id,
            templateUrl: 'popup.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, auth_service_1.AuthService])
    ], PopupComponent);
    return PopupComponent;
}());
exports.PopupComponent = PopupComponent;
//# sourceMappingURL=popup.component.js.map