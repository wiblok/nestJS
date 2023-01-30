import { IsString } from '@nestjs/class-validator';

export class UpdateBlogDto {
  @IsString()
  content: string;
}