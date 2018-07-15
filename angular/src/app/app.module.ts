import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import {AuthGuard} from './guards/AuthGuard';
import {LoginGuard} from './guards/LoginGuard';
import {ServerService} from './services/server.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'store',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: StoreComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'product/:description',
        component: ProductComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    StoreComponent,
    CartComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
