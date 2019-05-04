import { RouterReducerState } from '@ngrx/router-store';
import { initialPresidentState } from './president.state';
import { President } from '../../models/president.model';

export interface IAppState {
    router?: RouterReducerState,
    presidents: Array<President>
}

export const initialAppState: IAppState = {
    presidents: initialPresidentState
}

export function getInitialState(): IAppState {
    return initialAppState;
}