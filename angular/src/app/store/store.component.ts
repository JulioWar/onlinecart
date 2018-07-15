import { Component } from '@angular/core';
import {ServerService} from '../services/server.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  loadingProducts: boolean = false;
  error: string = '';
  search: string = '';
  productFilter: Array<any> = [];
  products: Array<any> = [];

  constructor(private server: ServerService) {
    this.loadingProducts = true;
    this.server.getProducts().subscribe(
      (products: Array<any>) => {
        this.products = products.filter((item) => !!item).map((item) => {
          item.amount = 1;
          return item;
        });
        this.server.products = [...this.products];
        this.productFilter = [...this.products];
      },
      () => {
        this.error = 'Error en la conexion al servidor.';
      }
    )
  }

  onSearch() {
    if (this.search) {
      this.productFilter = this.products.filter((item) => {
        return item.description && item.description.toString().toLowerCase().includes(this.search.toLowerCase());
      });
    } else {
      this.productFilter = [...this.products];
    }
  }

  addProduct(product) {
    if (product.amount <= 0) {
      alert('verifica que la cantidad sea un numero positivo.');
      return;
    }

    if (product.amount > (product.stock - this.amountInCart(product.id))) {
      alert('verifica que la cantidad menor o igual a las existencias.');
      return;
    }

    this.server.saveProduct(
      {
        product_id: product.id,
        image: product.image,
        description: product.description,
        amount: product.amount,
        price: product.price
      }
    );
  }

  amountInCart(id: number | string): number {
    return this.server.amountInCart(id);
  }

}
