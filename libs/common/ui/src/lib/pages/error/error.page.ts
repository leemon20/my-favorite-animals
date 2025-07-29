import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-error-page',
  template: `<div>Page not found</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPage {}
