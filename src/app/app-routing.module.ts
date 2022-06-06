import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { GuardGuard } from './pages/guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module')            .then( m => m.PagesModule       )
  },
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then( m => m.CollectionsModule )
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')            .then( m => AdminModule         ),
    canLoad     : [ GuardGuard ],
    canActivate : [ GuardGuard ]

  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
