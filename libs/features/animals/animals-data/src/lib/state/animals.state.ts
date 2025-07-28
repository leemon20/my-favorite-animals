import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { AnimalsService } from '../services/animals.service';
import {
  LoadAnimalOfDayAction,
  LoadAnimalOfDayErrorAction,
  LoadAnimalOfDaySuccessAction,
  LoadFavoriteAnimalsAction,
  LoadFavoriteAnimalsErrorAction,
  LoadFavoriteAnimalsSuccessAction,
} from './animals.actions';
import { AnimalsStateModel, initializeAnimalsStateModel } from './animals.model';

export const ANIMALS_STATE_TOKEN: StateToken<AnimalsStateModel> = new StateToken('animals');

@State<AnimalsStateModel>({
  name: ANIMALS_STATE_TOKEN,
  defaults: initializeAnimalsStateModel(),
})
@Injectable({ providedIn: 'root' })
export class AnimalsState {
  private readonly animalsService = inject(AnimalsService);

  @Action(LoadFavoriteAnimalsAction, { cancelUncompleted: true })
  public loadFavoriteAnimals(ctx: StateContext<AnimalsStateModel>): Observable<void> {
    ctx.patchState({
      favoriteAnimalsLoading: true,
      favoriteAnimals: undefined,
      favoriteAnimalsLoadingError: undefined,
    });

    return this.animalsService.getAnimals().pipe(
      switchMap((animals) => {
        return ctx.dispatch(new LoadFavoriteAnimalsSuccessAction(animals));
      }),
      catchError((error) => {
        return ctx.dispatch(new LoadFavoriteAnimalsErrorAction(error));
      }),
      map(() => void 0),
    );
  }

  @Action(LoadFavoriteAnimalsSuccessAction)
  public loadFavoriteAnimalsSuccess(
    ctx: StateContext<AnimalsStateModel>,
    action: LoadFavoriteAnimalsSuccessAction,
  ): void {
    return ctx.patchState({
      favoriteAnimals: action.payload,
      favoriteAnimalsLoading: false,
      favoriteAnimalsLoadingError: undefined,
    });
  }

  @Action(LoadFavoriteAnimalsErrorAction)
  public loadFavoriteAnimalsError(ctx: StateContext<AnimalsStateModel>, action: LoadFavoriteAnimalsErrorAction): void {
    return ctx.patchState({
      favoriteAnimals: undefined,
      favoriteAnimalsLoading: false,
      favoriteAnimalsLoadingError: action.payload.error?.message || 'An error occurred while loading favorite animals.',
    });
  }

  // MARK: Animal of Day
  @Action(LoadAnimalOfDayAction, { cancelUncompleted: true })
  public loadAnimalOfDay(ctx: StateContext<AnimalsStateModel>): Observable<void> {
    ctx.patchState({ animalOfDayLoading: true, animalOfDay: undefined, animalOfDayLoadingError: undefined });

    return this.animalsService.getAnimalOfDay().pipe(
      switchMap((animal) => {
        return ctx.dispatch(new LoadAnimalOfDaySuccessAction(animal));
      }),
      catchError((error) => {
        return ctx.dispatch(new LoadAnimalOfDayErrorAction(error));
      }),
      map(() => void 0),
    );
  }

  @Action(LoadAnimalOfDaySuccessAction)
  public loadAnimalOfDaySuccess(ctx: StateContext<AnimalsStateModel>, action: LoadAnimalOfDaySuccessAction): void {
    return ctx.patchState({
      animalOfDay: action.payload ?? undefined,
      animalOfDayLoading: false,
      animalOfDayLoadingError: undefined,
    });
  }

  @Action(LoadAnimalOfDayErrorAction)
  public loadAnimalOfDayError(ctx: StateContext<AnimalsStateModel>, action: LoadAnimalOfDayErrorAction): void {
    return ctx.patchState({
      animalOfDay: undefined,
      animalOfDayLoading: false,
      animalOfDayLoadingError:
        action.payload.error?.message || 'An error occurred while loading the animal of the day.',
    });
  }
}
