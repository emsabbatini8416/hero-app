import { Component, signal } from '@angular/core';
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
  heroForm: FormGroup;
  editMode = signal(false);
  heroId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
    });

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
