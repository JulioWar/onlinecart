import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from '../services/server.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public cart: any = {};

  constructor(private router: Router, private server: ServerService) {
    this.server.cart.subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit() {
  }

  public logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
