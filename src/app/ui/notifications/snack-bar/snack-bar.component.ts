import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackBarData } from 'src/app/ui/notifications/snack-bar/snack-bar-data.interface';

@Component({
  selector: 'dc-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent {

  public message!: string;

  public matIcon!: string;

  public color!: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: SnackBarData) {
    this.message = data.message;
    this.matIcon = data.matIcon;
    this.color = data.color;
  }
}
