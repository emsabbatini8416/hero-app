import { Component, computed, inject, signal } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ModalService } from '../../services/modal.service';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  standalone: true,
  selector: 'app-hero-list',
  imports: [CommonModule, RouterModule, ConfirmationModalComponent, PaginationComponent],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent {
  heroService = inject(HeroService);
  private modalService = inject(ModalService);

  heroes = this.heroService.heroes;

  filterText = signal<string>('');

  filteredHeroes = computed(() =>
    this.heroes().filter((hero) =>
      hero.name.toLowerCase().includes(this.filterText().toLowerCase()),
    ),
  );

  async deleteHero(id: number) {
    const confirmed = await this.modalService.open();
    if (confirmed) {
      this.heroService.deleteHero(id);
    }
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterText.set(value);
  }

  onPageChange(newPage: number) {
    this.heroService.setPage(newPage);
  }
}
