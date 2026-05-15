import { Test } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsRepository } from './restaurants.repository';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RestaurantsService, RestaurantsRepository],
    }).compile();
    service = module.get(RestaurantsService);
  });

  it('returns the seeded average for restaurant 1', async () => {
    const r = await service.findOne('1');
    expect(r.avgRating).toBeCloseTo(4.5, 2);
  });

  // TODO (candidato): scrivi un test che riproduce il bug:
  //   1. findOne('1')   → avg 4.5
  //   2. addReview('1', 5)
  //   3. findOne('1')   → atteso ~4.6, ottenuto 4.5 (bug)
  // Il test deve FALLIRE sul codice corrente e PASSARE dopo il fix.
});
