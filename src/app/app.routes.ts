import { Route } from "@angular/router";

export const appRoutes: Route[] = [
    {
        title: 'Lifecycle Example',
        path: 'lifecycle-example',
        loadComponent: () => import('../lifecycle-example/lifecycle-example.component').then(c => c.LifecycleExampleComponent)
    }
]