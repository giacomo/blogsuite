import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../../shared/services/blog/blog.service';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'app-blog-item',
    templateUrl: './blog-item.component.html',
    styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {
     @Input('slug') slug$!: string;
     item$: Observable<any> | undefined;

     constructor(
         private blogService: BlogService
     ) { }

     ngOnInit(): void {
        this.item$ = this.blogService.getBlogItem(this.slug$).pipe(
            tap((item: any) => console.log(item))
        );
     }
}
