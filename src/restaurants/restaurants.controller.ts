import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AddReviewDto } from './dto/add-review.dto';

/**
 * DO NOT MODIFY THIS FILE — the bug to fix is in restaurants.service.ts.
 */
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly service: RestaurantsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post(':id/reviews')
  async addReview(@Param('id') id: string, @Body() body: AddReviewDto) {
    if (typeof body?.rating !== 'number' || body.rating < 1 || body.rating > 5) {
      throw new BadRequestException('rating must be a number between 1 and 5');
    }
    return this.service.addReview(id, body.rating);
  }
}
