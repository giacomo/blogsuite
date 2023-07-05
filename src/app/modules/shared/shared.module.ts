import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        ArticleListComponent
    ],
    exports: [
        ArticleListComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class SharedModule {
}
