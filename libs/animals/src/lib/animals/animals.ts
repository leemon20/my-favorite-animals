import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-animals',
  imports: [CommonModule],
  templateUrl: './animals.html',
  styleUrl: './animals.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Animals {}
