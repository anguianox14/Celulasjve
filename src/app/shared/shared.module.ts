import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

//Route
import { AppRoutingModule } from '../app-routing.module';
//Icons
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ]
})
export class SharedModule { }
