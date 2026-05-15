import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RestaurantsRepository } from './restaurants.repository';
import { Restaurant } from './restaurants.types';

@Injectable()
export class RestaurantsService {
  // Cache for deduplication of concurrent reads (thundering herd protection).
  // Stores the in-flight Promise so concurrent callers share one DB hit.
  private cache = new Map<string, Promise<Restaurant>>();

  constructor(private readonly repo: RestaurantsRepository) {}

  async findOne(id: string): Promise<Restaurant> {
    if (this.cache.has(id)) {
      return this.cache.get(id) as Promise<Restaurant>;
    }
    const promise = this.repo.findById(id).then((r) => {
      if (!r) throw new NotFoundException(`Restaurant ${id} not found`);
      return r;
    });
    this.cache.set(id, promise);
    return promise;
  }

  async addReview(id: string, rating: number): Promise<Restaurant> {
    const restaurant = await this.repo.findById(id);
    if (!restaurant) throw new NotFoundException(`Restaurant ${id} not found`);

    restaurant.reviews.push({
      id: randomUUID(),
      rating,
      createdAt: new Date(),
    });
    restaurant.avgRating =
      restaurant.reviews.reduce((sum, r) => sum + r.rating, 0) /
      restaurant.reviews.length;

    await this.repo.save(restaurant);
    return restaurant;
  }
}
