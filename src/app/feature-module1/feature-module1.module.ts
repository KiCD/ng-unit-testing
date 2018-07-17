import { HttpClient } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClient
  ],
  declarations: []
})
export class FeatureModule1Module { }
