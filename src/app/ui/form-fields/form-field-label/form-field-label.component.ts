import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'dc-form-field-label',
  templateUrl: './form-field-label.component.html',
  styleUrls: ['./form-field-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldLabelComponent {

  @Input()
  public label!: string;

  @Input()
  public required = false;

  @ContentChild('template')
  public template!: TemplateRef<any>;

}
