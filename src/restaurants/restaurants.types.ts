export interface Review {
  id: string;
  rating: number;
  createdAt: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  reviews: Review[];
  avgRating: number;
}
