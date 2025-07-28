import { HttpErrorResponse } from '@angular/common/http';
import { AnimalModel } from '../models/animal.model';

const ACTION_PREFIX = '[Animals]';

// MARK: Animals

export class LoadFavoriteAnimalsAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Favorite Animals`;
}

export class LoadFavoriteAnimalsSuccessAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Favorite Animals Success`;

  constructor(public readonly payload: AnimalModel[]) {}
}

export class LoadFavoriteAnimalsErrorAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Favorite Animals Error`;

  constructor(public readonly payload: HttpErrorResponse) {}
}

// MARK: Animal Of The Day

export class LoadAnimalOfDayAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Animal Of The Day`;
}

export class LoadAnimalOfDaySuccessAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Animal Of The Day Success`;

  constructor(public readonly payload: AnimalModel | null) {}
}

export class LoadAnimalOfDayErrorAction {
  public static readonly type: string = `${ACTION_PREFIX} Load Animal Of The Day Error`;

  constructor(public readonly payload: HttpErrorResponse) {}
}
