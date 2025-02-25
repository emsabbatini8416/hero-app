import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { CommonModule } from '@angular/common';
import { CamelCaseDirective } from '../../shared/directives/camel-case.directive';

@Component({
  standalone: true,
  selector: 'app-hero-form',
  imports: [CommonModule, ReactiveFormsModule, CamelCaseDirective],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent {
  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  heroForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
  });
  editMode = signal(false);
  heroId: number | null = null;

  get nameControl() {
    return this.heroForm.get('name');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode.set(true);
      this.heroId = +idParam;
      const hero = this.heroService.getHeroById(this.heroId);
      if (hero) {
        this.heroForm.patchValue({ name: hero.name });
      }
    }
  }

  saveHero() {
    if (this.heroForm.valid) {
      const name = this.heroForm.value.name;
      if (this.editMode()) {
        this.heroService.updateHero(this.heroId!, name);
      } else {
        this.heroService.addHero(name);
      }
      this.router.navigate(['/heroes']);
    }
  }

  cancel() {
    this.router.navigate(['/heroes']);
  }
}
