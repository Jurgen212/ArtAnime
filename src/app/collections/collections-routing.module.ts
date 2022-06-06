import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AguaComponent } from './agua/agua.component';
import { AireComponent } from './aire/aire.component';
import { CollectionsMainComponent } from '../pages/collections-main/collections-main.component';
import { TierraComponent } from './tierra/tierra.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'agua'            , component : AguaComponent           },
      { path: 'aire'            , component : AireComponent           },
      { path: 'tierra'          , component : TierraComponent         },
      { path: '**'              , redirectTo: 'agua'                  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
