import { Component, computed, signal } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-hero-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent {
  heroes;
  filterText = signal<string>('')

  constructor(private heroService: HeroService) {
    this.heroes = this.heroService.heroes;
  }

  filteredHeroes = computed(() =>
    this.heroes().filter((hero) =>
      hero.name.toLowerCase().includes(this.filterText().toLowerCase())
    )
  );

  deleteHero(id: number) {
    this.heroService.deleteHero(id);
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterText.set(value);
  }
}