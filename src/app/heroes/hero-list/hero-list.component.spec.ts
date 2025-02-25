import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { computed, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: HeroService;

  const mockHeroes = [
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
  ];

  beforeEach(async () => {
    const heroServiceMock = {
      heroes: signal(mockHeroes),
      currentPage: computed(() => 1),
      totalPages: computed(() => 2),
    };

    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }),
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display heroes', () => {
    const heroElements = fixture.debugElement.queryAll(By.css('.hero-list-card'));
    expect(heroElements.length).toBe(mockHeroes.length);
  });

  it('should call delete() when edit button is clicked', () => {
    spyOn(component, 'deleteHero');
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.delete')).nativeElement;
    deleteButton.click();
    expect(component.deleteHero).toHaveBeenCalled();
  });
});
