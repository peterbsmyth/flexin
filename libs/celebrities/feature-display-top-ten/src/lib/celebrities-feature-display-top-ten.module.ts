import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CelebritiesDomainModule } from '@bod/celebrities/domain';
import { DisplayTopTenComponent } from './display-top-ten.component';

@NgModule({
  imports: [CommonModule, CelebritiesDomainModule],
  declarations: [DisplayTopTenComponent],
  exports: [DisplayTopTenComponent],
})
export class CelebritiesFeatureDisplayTopTenModule {}
