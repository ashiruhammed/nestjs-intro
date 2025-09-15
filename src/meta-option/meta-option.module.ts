import { Module } from '@nestjs/common';
import { MetaOptionController } from './meta-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaOptionService } from './meta-option.service';

@Module({
  controllers: [MetaOptionController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionService],
})
export class MetaOptionModule {}
