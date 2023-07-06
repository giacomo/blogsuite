import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../../shared/services/blog/blog.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-blog-item',
    templateUrl: './blog-item.component.html',
    styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {
    private fileNameSubject$ = new BehaviorSubject<string>('');

    @Input()
    set slug(slug: string) {
        this.fileNameSubject$.next(slug);
    }

    item$: Observable<any> | undefined;

    constructor(
        private blogService: BlogService
    ) {
    }

    ngOnInit(): void {
        this.item$ = this.fileNameSubject$.pipe(
            switchMap((slug: string) => this.blogService.getBlogItem(slug)),
        );
    }
}
