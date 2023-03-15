import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppStarterComponent } from './app-starter/app-starter.component';
import { BrandsResolverResolver } from './app-starter/brands-resolver.resolver';
import { EditComponent } from './app-starter/edit/edit.component';
import { MediaResolver } from './app-starter/edit/media.resolver';
import { PayloadResolverResolver } from './app-starter/payload-resolver.resolver';

const routes: Routes = [
  { path: '', component: AppStarterComponent, resolve: { brands: BrandsResolverResolver, requests: PayloadResolverResolver} },
  { path: 'edit/:id', component: EditComponent, resolve: { brands: BrandsResolverResolver, requests: PayloadResolverResolver, medias: MediaResolver}  },
  { path: '**', component: AppStarterComponent, resolve: { brands: BrandsResolverResolver, requests: PayloadResolverResolver}  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
