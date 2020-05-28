import { Routes } from "@angular/router";
import { BlogViewComponent } from "./Widget/blog-view/blog-view.component";
import { BlogListComponent } from "./Widget/blog-list/blog-list.component";
import { GlobalComponent } from "./Widget/global/global.component";
import { HomeComponent } from "./Widget/home/home.component";

export const appRoutes: Routes = [
  /*{
    path: "social",
    component: SocialComponent
  },
  {
    path: "**",
    component: SocialComponent
  }*/
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
    data: { EndPoint: "" }
  },
  {
    path: "blog/:alias",
    component: BlogViewComponent
  },
  {
    path: "category/:term",
    component: BlogListComponent
  },
  {
    path: "assets/css",
    pathMatch: "full",
    redirectTo: "/assets/css/"
  },
  {
    path: "assets",
    pathMatch: "full",
    redirectTo: "/src/sites/default/files/content_images/icons/"
  },
  { path: "**", component: GlobalComponent, data: { EndPoint: "" } }
];
