import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
