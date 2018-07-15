import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerService {

  public products: Array<any> = [];
  public cart: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public cartId: number | string;


  private baseUrl: string = 'https://onlinecart-adfef.firebaseio.com'

  constructor(private http: HttpClient) {}

  all(): Observable<any> {
    return this.http.get(`${this.baseUrl}/.json`);
  }

  users(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users.json`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products.json`).map((products: Array<any>) => {
      return products.filter((item) => !!item);
    });
  }

  updateProducts(products): Observable<any> {
    return this.http.put(`${this.baseUrl}/products.json`, products);
  }

  deleteCart(): void {
    this.cart.next({})
  }

  saveProduct(product): void {
    const cart = this.cart.value;
    if (!cart.products) {
      cart.products = [];
    }
    cart.products.push(product);
  }

  hasProduct(id: number): boolean {
    if (this.cart.value && this.cart.value.products) {
      for(let item of this.cart.value.products) {
        if (Number(item.product_id) === Number(id)) {
          return true;
        }
      }
    }
    return false;
  }

  amountInCart(id): number {
    if (this.cart.value && this.cart.value.products) {
      return this.cart.value.products
        .filter((item) => Number(item.product_id) === Number(id))
        .map(item => item.amount)
        .reduce((previous, current) => (previous + current), 0);
    }
    return 0;
  }

}
