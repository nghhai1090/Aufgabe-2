import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from 'src/shared/app-service.service';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { SearchComponent } from '../search/search.component';
import { NotfoundComponent } from '../notfound/notfound.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    SearchComponent,
    routingComponents,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
