import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    'path': 'login',
    'component': LoginComponent
  },
  {
    'path': 'store',
    'component': MainComponent,
    'children': [
      {
        'path': '',
        'component': StoreComponent
      },
      {
        'path': 'cart',
        'component': CartComponent
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
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
