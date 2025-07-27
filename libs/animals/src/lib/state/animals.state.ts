import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { EMPTY, Observable } from 'rxjs';
import { LoadAnimalsAction, LoadAnimalsErrorAction, LoadAnimalsSuccessAction } from './animals.actions';
import { AnimalsStateModel, initializeAnimalsStateModel } from './animals.model';

export const ANIMALS_STATE_TOKEN: StateToken<AnimalsStateModel> = new StateToken('animals');

@State<AnimalsStateModel>({
  name: ANIMALS_STATE_TOKEN,
  defaults: initializeAnimalsStateModel(),
})
@Injectable()
export class AnimalsState {
  @Action(LoadAnimalsAction)
  public loadAnimals(ctx: StateContext<AnimalsStateModel>): Observable<void> {
    ctx.patchState({ loading: true });

    return EMPTY;
    // this.animalsService.getAnimals().pipe(
    //   tap({
    //     next: (animals) => {
    //       ctx.dispatch(new LoadAnimalsSuccessAction(animals));
    //     },
    //     error: (error) => {
    //       ctx.dispatch(new LoadAnimalsErrorAction(error));
    //     },
    //   }),
    // );
  }

  @Action(LoadAnimalsSuccessAction)
  public loadAnimalsSuccess(ctx: StateContext<AnimalsStateModel>, action: LoadAnimalsSuccessAction): void {
    ctx.patchState({
      animals: action.payload,
      loading: false,
    });
  }

  @Action(LoadAnimalsErrorAction)
  public loadAnimalsError(ctx: StateContext<AnimalsStateModel>, action: LoadAnimalsErrorAction): void {
    ctx.patchState({
      animals: undefined,
      loading: false,
      error: action.payload.error?.message || 'An error occurred while loading animals.',
    });
  }
}
