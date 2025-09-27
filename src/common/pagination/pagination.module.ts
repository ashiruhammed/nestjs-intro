import { Module } from '@nestjs/common';
import { PaginatedProvider } from './providers/paginated.provider';

@Module({
  providers: [PaginatedProvider],
  exports: [PaginatedProvider],
})
export class PaginationModule {}
