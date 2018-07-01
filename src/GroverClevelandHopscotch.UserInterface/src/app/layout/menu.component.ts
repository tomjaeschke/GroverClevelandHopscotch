import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'links',
    templateUrl: './menu.component.html',
    styleUrls:  ['./menu.component.css']
})
export class MenuComponent {
    public isNotHome:Boolean;
    public whereAmI:string;
    constructor(router: Router) {
        router.events.subscribe((event: any) => {
            if (event.url == "/" || event.url == "/home") {
                this.isNotHome = false;
                this.whereAmI = 'home';
            } else {
                this.isNotHome = true;
                if (event.url) {
                    this.whereAmI = event.url.split("/")[1];
                }                
            }
        });
    }
}