import { HttpErrorResponse } from '@angular/common/http';
import { Animals } from '../animals/animals';

const ACTION_PREFIX = '[Tarifvarianten]';

export class LoadAnimalsAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Animals`;
}

export class LoadAnimalsSuccessAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Animals Success`;

  constructor(public readonly payload: Animals) {}
}

export class LoadAnimalsErrorAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Animals Error`;

  constructor(public readonly payload: HttpErrorResponse) {}
}
