import { Component, computed, signal } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  standalone: true,
  selector: 'app-hero-list',
  imports: [CommonModule, RouterModule, NgFor, NgIf, PaginationComponent],
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

  get currentPage() {
    return this.heroService.currentPage();
  }

  get totalPages() {
    return this.heroService.totalPages();
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id);
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterText.set(value);
  }

  onPageChange(newPage: number) {
    this.heroService.setPage(newPage);
  }
}