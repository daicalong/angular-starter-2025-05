import { Route } from "@angular/router";

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        title: 'Home',
        path: 'home',
        loadComponent: () => import('../home/home.component').then(c => c.HomeComponent)
    },
    {
        title: 'Lifecycle Example',
        path: 'lifecycle-example',
        loadComponent: () => import('../lifecycle-example/lifecycle-example.component').then(c => c.LifecycleExampleComponent)
    }
]