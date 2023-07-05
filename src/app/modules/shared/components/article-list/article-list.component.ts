import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
    articles$!: Observable<{ results: { title: string, description: string, slug: string }[] }> | undefined;

    constructor(
        private blogService: BlogService
    ) {
    }


    ngOnInit(): void {
        this.articles$ = this.blogService.getBlogItems();
    }

}
