import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from 'tiny-markdown-parser';
import { catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    constructor(
        private http: HttpClient
    ) {
    }

    getBlogItem(slug: string) {
        // check if slug contains numbers _ , - or characters
        if (!slug.match(/^[a-zA-Z0-9_-]+$/)) {
            return of({
                header: {
                    title: '404',
                },
                body: '<p>Page not found!</p>'
            });
        }

        // read the assets folder and return the appropriate MD file
        return this.http.get(`assets/articles/${slug}.md`, { responseType: 'text' }).pipe(
            // split the contents of the MD file into an array
            // split the array into a header and a body
            map((contents: string) => contents.split('---')),
            map((contents: string[]) => {
                // parse the header into an object
                const header: any = {};
                contents[0].split('\n').forEach((line: string) => {
                    const [key, value] = line.split(':');
                    if (key && value) {
                        header[key.trim().toLowerCase()] = value.trim();
                    }
                });
                // return the header and the body
                return {
                    header,
                    body: parse(contents[1])
                };
            }),
            catchError((error: any) => {
                console.log(error);
                return of({
                    header: {
                        title: '404',
                    },
                    body: '<p>Page not found!</p>'
                })
            })

        );
    }

    getBlogItems() {
        // read the assets folder and return the content of list.json
        return this.http.get('assets/articles/list.json').pipe(
            // map the list.json into an array of objects
            map((list: any) => {
                return {
                    results: list
                }
            }),
            catchError(() => {
                return of({
                    results: []
                })
            })
        );
    }
}
