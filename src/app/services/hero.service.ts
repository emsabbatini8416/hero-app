import { Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private _heroes = signal<Hero[]>([
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
  ]);

  get heroes() {
    return this._heroes.asReadonly(); // Expose as readonly signal to prevent direct modifications.
  }

  addHero(name: string) {
    const newHero: Hero = {
      id: Math.max(...this._heroes().map((h) => h.id), 0) + 1,
      name,
    };
    this._heroes.update((heroes) => [...heroes, newHero]);
  }

  updateHero(id: number, name: string) {
    this._heroes.update((heroes) =>
      heroes.map((hero) => (hero.id === id ? { ...hero, name } : hero))
    );
  }

  deleteHero(id: number) {
    this._heroes.update((heroes) => heroes.filter((hero) => hero.id !== id));
  }

  getHeroById(id: number): Hero | undefined {
    return this._heroes().find((hero) => hero.id === id);
  }
}
