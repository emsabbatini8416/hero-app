import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve hero list with 2 hero by default', () => {
    const heroes = service.heroes();
    expect(heroes.length).toBe(2);
  });

  it('should add a hero', () => {
    service.addHero('Flash');
    expect(service.heroes().length).toBe(3);
    expect(service.heroes()[2].name).toBe('Flash');
  });

  it('should delete a hero', () => {
    service.addHero('Wonder Woman');
    service.deleteHero(1);
    expect(service.heroes().length).toBe(2);
  });
});
