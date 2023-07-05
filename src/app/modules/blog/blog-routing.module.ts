import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogItemComponent } from './pages/blog-item/blog-item.component';

const routes: Routes = [
    {
        path: ':slug',
        component: BlogItemComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule {
}
