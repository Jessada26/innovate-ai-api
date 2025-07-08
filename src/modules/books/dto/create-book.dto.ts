import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @IsOptional()
  @IsInt()
  publishedYear?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  genre?: string;
}
