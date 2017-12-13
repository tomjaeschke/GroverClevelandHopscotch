import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'links',
    templateUrl: './menu.component.html',
    styleUrls:  ['./menu.component.css']
})
export class MenuComponent {
    public isNotHome:Boolean;
    public whereAmI:string;
    constructor() {
        let routeChunks:Array<string> = (document.URL).split("/");
        if (routeChunks.length < 4 || !routeChunks[3].trim() || routeChunks[3].toLowerCase().trim() === "home") {
            this.isNotHome = false;
            this.whereAmI = 'home';
        } else {
            this.isNotHome = true;
            this.whereAmI = routeChunks[3].toLowerCase().trim();
        }
    }
}