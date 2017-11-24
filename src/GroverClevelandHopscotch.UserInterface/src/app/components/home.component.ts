import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls:  ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('canvas') canvas: ElementRef;

    ngOnInit(){
        let context = this.canvas.nativeElement.getContext("2d");
        context.strokeStyle = "#0000FF";
        context.lineWidth = 1;
        context.moveTo(146,3);
        context.lineTo(0,31);
        context.lineTo(17,46);
        context.lineTo(178,14);
        context.lineTo(146,3);
        context.stroke();
        context.moveTo(204,25);
        context.lineTo(30,64);
        context.lineTo(54,90);
        context.lineTo(242,39);
        context.lineTo(204,25);
        context.stroke();
        context.moveTo(129,69);
        context.lineTo(241,141);
        context.stroke();
        context.moveTo(307,111);
        context.lineTo(188,54);
        context.stroke();
        context.moveTo(228,132);
        context.lineTo(293,105);
        context.stroke();
        context.moveTo(189,108);
        context.lineTo(255,86);
        context.stroke();
        context.moveTo(159,88);
        context.lineTo(219,70);
        context.stroke();
        context.moveTo(158,62);
        context.lineTo(125,42);
        context.stroke();
        context.moveTo(105,30);
        context.lineTo(79,16);
        context.stroke();
        context.moveTo(100,48);
        context.lineTo(77,35);
        context.stroke();
        context.moveTo(157,35);
        context.lineTo(133,24);
        context.stroke();
    }
}