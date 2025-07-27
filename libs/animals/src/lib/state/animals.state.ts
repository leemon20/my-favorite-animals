import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { AnimalsService } from '../services/animals.service';
import { LoadAnimalsAction, LoadAnimalsErrorAction, LoadAnimalsSuccessAction } from './animals.actions';
import { AnimalsStateModel, initializeAnimalsStateModel } from './animals.model';

export const ANIMALS_STATE_TOKEN: StateToken<AnimalsStateModel> = new StateToken('animals');

@State<AnimalsStateModel>({
  name: ANIMALS_STATE_TOKEN,
  defaults: initializeAnimalsStateModel(),
})
@Injectable()
export class AnimalsState {
  private readonly animalsService = inject(AnimalsService);

  @Action(LoadAnimalsAction, { cancelUncompleted: true })
  public loadAnimals(ctx: StateContext<AnimalsStateModel>): Observable<void> {
    ctx.patchState({ loading: true, animals: undefined, error: undefined });

    return this.animalsService.getAnimals().pipe(
      switchMap((animals) => {
        return ctx.dispatch(new LoadAnimalsSuccessAction(animals));
      }),
      catchError((error) => {
        return ctx.dispatch(new LoadAnimalsErrorAction(error));
      }),
      map(() => void 0),
    );
  }

  @Action(LoadAnimalsSuccessAction)
  public loadAnimalsSuccess(ctx: StateContext<AnimalsStateModel>, action: LoadAnimalsSuccessAction): void {
    return ctx.patchState({ animals: action.payload, loading: false, error: undefined });
  }

  @Action(LoadAnimalsErrorAction)
  public loadAnimalsError(ctx: StateContext<AnimalsStateModel>, action: LoadAnimalsErrorAction): void {
    return ctx.patchState({
      animals: undefined,
      loading: false,
      error: action.payload.error?.message || 'An error occurred while loading animals.',
    });
  }
}
