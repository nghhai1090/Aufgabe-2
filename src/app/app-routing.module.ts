import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from 'src/create/create.component';
import { EditComponent } from 'src/edit/edit.component';
import { NotfoundComponent } from 'src/notfound/notfound.component';
import { SearchComponent } from 'src/search/search.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path:'create', component: CreateComponent},
  {path:'',component:SearchComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'**',component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CreateComponent,SearchComponent,EditComponent,NotfoundComponent]
