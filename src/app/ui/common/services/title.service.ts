import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  public readonly title = new BehaviorSubject<string>('');

  private dynamicTitle: string | null = null;

  constructor(private titleService: Title) {
    this.title.next(this.titleService.getTitle());
  }

  public setTitle(title: string): void {
    this.title.next(title);
    this.refreshTitle();
  }

  public getTitle(): string {
    return this.title.value;
  }

  public setDynamicTitle(title: string): void {
    this.dynamicTitle = title;
    this.refreshTitle();
  }

  public clearDynamicTitle(): void {
    this.dynamicTitle = null;
    this.refreshTitle();
  }

  private refreshTitle(): void {
    const title = this.dynamicTitle || this.title.getValue();
    this.titleService.setTitle(title);
  }
}
