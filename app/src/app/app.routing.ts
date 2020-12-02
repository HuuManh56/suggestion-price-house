import { Routes, RouterModule } from "@angular/router";

import { FullComponent } from "./layouts/full/full.component";
import { NgModule } from "@angular/core";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./core/guards/auth.guard";

export const AppRoutes: Routes = [
  {
    path: "",
    component: FullComponent,
    pathMatch: "prefix",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/starter",
        pathMatch: "full"
      },
      {
        path: "",
        loadChildren:
          "./material-component/material.module#MaterialComponentsModule"
      },
      {
        path: "starter",
        loadChildren: "./starter/starter.module#StarterModule"
      },
      {
        path: "",
        loadChildren: "./utt-component/utt.module#UttModule"
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    loadChildren: "./utt-component/auth/auth.module#AuthModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
