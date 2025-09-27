import { Injectable } from '@nestjs/common';
import { PaginatedQueryDto } from '../dto';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginatedProvider {
  constructor() {}

  public async paginate<T extends ObjectLiteral>(
    query: PaginatedQueryDto,
    repository: Repository<T>,
  ) {
    const { limit, page } = query;
    const skip = (page ?? 0 - 1) * (limit ?? 10);
    const [data, total] = await repository.findAndCount({
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page: page ?? 0,
      limit: limit ?? 10,
    };
  }
}
