//https://blog.angular-university.io/angular-responsive-design/#:~:text=Follow%20these%20steps%20to%20implement,depending%20on%20the%20screen%20size
//https://www.digitalocean.com/community/tutorials/angular-breakpoints-angular-cdk

/*import { Component } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints
} from '@angular/cdk/layout';*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";
import { delay } from "rxjs/operators";
import {LoginService} from "./service/login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  categoriaIsExpanded = false;
  serviciosIsExpanded = false;

  title = 'FrontEnd';

  constructor(
    private observer: BreakpointObserver,
    private loginService: LoginService
    ) { }

  ngAfterViewInit() {
    this.observer
      .observe(["(max-width: 700px)"])
      .pipe(delay(1)) // delay 1mS
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });
  }

  // para saber si el usuario inició o no sesión
  estaLogueado() {
    return this.loginService.estaLogueado();
  }
}


  /*constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {

    this.breakpointObserver
      .observe(Breakpoints.Small) //.observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport width is 500px or greater!');
        } else {
          console.log('Viewport width is less than 500px!');
        }
      });

  }*/
