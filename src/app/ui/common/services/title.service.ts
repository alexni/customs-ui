import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  public readonly title = new BehaviorSubject<string>('');

  constructor(private titleService: Title) {
    this.title.next(this.titleService.getTitle());
  }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
    this.title.next(title);
  }

  public getTitle(): string {
    return this.title.value;
  }
}
