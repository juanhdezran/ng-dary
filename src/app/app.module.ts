import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { FramesListComponent } from './components/frames-list/frames-list.component';
import { FramesService } from './api/services/frames.service';
import { FilterByCategoryID } from './api/pipes/filterByCategoryID.pipe';
import { IsInFramesChecked } from './api/pipes/isInFramesChecked.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { ModalDetailComponent } from './components/modal-detail/modal-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    FramesListComponent,
    FilterByCategoryID,
    IsInFramesChecked,
    ModalComponent,
    ModalDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule    
  ],
  providers: [
    FramesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
