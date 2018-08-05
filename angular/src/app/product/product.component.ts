import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServerService} from '../services/server.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private server: ServerService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params['description'] && this.server.products.length !== 0) {


        const products: Array<any> = this.server.products.filter((product) => {
          return product.description == params['description'];
        });

        if (products.length > 0) {
          this.product = products[0];
        } else {
          this.router.navigate(['store']);
        }
      } else {
        this.router.navigate(['store']);
      }
    })
  }

  prouductInCart() {
    return this.server.amountInCart(this.product.id);
  }

}
