import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HeroFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }),
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate name input (only letters allowed)', () => {
    const nameInput = component.heroForm.controls['name'];
    nameInput.setValue('Hero123');
    expect(nameInput.valid).toBeFalsy();

    nameInput.setValue('Superman');
    expect(nameInput.valid).toBeTruthy();
  });

  it('should submit form when valid', () => {
    spyOn(component, 'saveHero');
    component.heroForm.setValue({ name: 'Batman' });

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(component.saveHero).toHaveBeenCalled();
  });
});
