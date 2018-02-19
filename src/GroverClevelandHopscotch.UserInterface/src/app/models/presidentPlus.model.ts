import { President } from './president.model';
export class PresidentPlus extends President {
    Positions: Array<number>;
    IsCurrentPresident:Boolean;
}