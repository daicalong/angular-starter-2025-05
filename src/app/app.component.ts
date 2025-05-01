import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterModule,
  ]
})
export class AppComponent {
  routes = appRoutes;
}
