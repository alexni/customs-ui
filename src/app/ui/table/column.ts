import { TemplateRef } from '@angular/core';

export class Column {
  constructor(
    public property: string,
    public title: string,
    public templateRef: TemplateRef<any> | null = null,
  ) {
  }
}
