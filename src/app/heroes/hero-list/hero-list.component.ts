import { Component } from '@angular/core';
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

  constructor(private heroService: HeroService) {
    this.heroes = this.heroService.heroes;
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id);
  }
}