import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurants.types';

/**
 * In-memory data store. Simulates a slow database query (50ms) on read.
 *
 * DO NOT MODIFY THIS FILE — the bug to fix is in restaurants.service.ts.
 */
@Injectable()
export class RestaurantsRepository {
  private store = new Map<string, Restaurant>([
    [
      '1',
      {
        id: '1',
        name: 'Trattoria da Mario',
        city: 'Milano',
        reviews: [
          { id: 'r1', rating: 5, createdAt: new Date('2025-01-10') },
          { id: 'r2', rating: 4, createdAt: new Date('2025-01-12') },
          { id: 'r3', rating: 4, createdAt: new Date('2025-02-01') },
          { id: 'r4', rating: 5, createdAt: new Date('2025-02-15') },
        ],
        avgRating: 4.5,
      },
    ],
    [
      '2',
      {
        id: '2',
        name: 'Pizzeria Sorbillo',
        city: 'Napoli',
        reviews: [
          { id: 'r5', rating: 5, createdAt: new Date('2025-01-20') },
          { id: 'r6', rating: 5, createdAt: new Date('2025-02-05') },
        ],
        avgRating: 5,
      },
    ],
  ]);

  async findById(id: string): Promise<Restaurant | undefined> {
    // simulate DB latency
    await new Promise((resolve) => setTimeout(resolve, 50));
    return this.store.get(id);
  }

  async save(restaurant: Restaurant): Promise<void> {
    this.store.set(restaurant.id, restaurant);
  }
}
