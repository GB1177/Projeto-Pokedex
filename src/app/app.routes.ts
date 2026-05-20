import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pokedex/pages/pokedex-page/pokedex-page.component').then(
        (component) => component.PokedexPageComponent
      )
  }
];
