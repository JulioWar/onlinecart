import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from '../services/server.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public processing: boolean = false;
  public cart: any = {};

  constructor(private server: ServerService,
              private router: Router) {
    this.server.cart.subscribe((cart:any) => {
      this.cart = cart;
    });

    if (!this.cart.products || this.cart.products.length === 0) {
      this.router.navigate(['store'])
    }
  }

  calculateTotal(): number {
    if (this.cart.products) {
      return this.cart.products.map(item => (item.price * item.amount))
        .reduce((current, next) => {
          return current + next;
        }, 0);
    }

    return 0;
  }

  cancelCart(): void {
    this.server.deleteCart()
    this.router.navigate(['store'])
  }

  payCart(): void {
    this.processing = true;
    this.server.getProducts().subscribe(
      (products: Array<any>) => {
        products.forEach((product) => {
          if (this.server.hasProduct(product.id)) {
            product.stock -= this.server.amountInCart(product.id);
          }
        });
        this.server.updateProducts(products).subscribe(
          () => {
            this.processing = false;
            this.server.cart.next({});
            this.router.navigate(['store']);
          },
          () => {
            this.processing = false;
            alert('ocurrion un error al confirmar la compra, vuelva a intentarlo')
          }
        );
      },
      () => {
        this.processing = false;
        alert('ocurrion un error al confirmar la compra, vuelva a intentarlo')
      }
    )
  }

}
