import { Injectable } from '@nestjs/common';
import { characters, type Character } from './character';

@Injectable()
export class WarframeQuizService {
    getDay(): any {
        return new Date().getDate();
    }

    getIndex(today: any, charactersLenght: number): number {
        return today % charactersLenght
    }

    getDailyWarframe(): Character {
        const today = this.getDay();
        const index = this.getIndex(today, characters.length);
        return characters[index];
    }
}

