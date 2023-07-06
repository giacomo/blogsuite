import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        pathMatch: 'full',
        path: '',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    },
    {
        path: 'blog',
        loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule),
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            bindToComponentInputs: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
