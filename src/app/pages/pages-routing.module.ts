import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {FileListComponent} from '../shared/file-list/file-list.component';
import {PagesComponent} from './pages.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {BuildingComponent} from './building/building.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'file-list', component: FileListComponent},
      {path: 'file-upload', component: FileUploadComponent},
      {path: 'building', component: BuildingComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
