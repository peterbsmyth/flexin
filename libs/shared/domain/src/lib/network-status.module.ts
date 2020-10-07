import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHttpInterceptor } from './interceptors/error-http.interceptor';
import { NetworkStatusFacade } from './application/network-status.facade';
import { BusyHttpInterceptor } from './interceptors/busy-http.interceptor';
import { BusyService } from './infrastructure/busy.service';
import { ErrorService } from './infrastructure/error.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [NetworkStatusFacade, BusyService, ErrorService],
})
export class NetworkStatusModule {
  static forRoot(): ModuleWithProviders<NetworkStatusModule> {
    return {
      ngModule: NetworkStatusModule,
      providers: [
        NetworkStatusFacade,
        BusyService,
        ErrorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHttpInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BusyHttpInterceptor,
          multi: true,
        },
      ],
    };
  }
}
