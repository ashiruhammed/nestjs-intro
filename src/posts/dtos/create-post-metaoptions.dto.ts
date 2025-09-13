import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  key: string;

  @IsNotEmpty()
  @MinLength(3)
  value: any;
}
