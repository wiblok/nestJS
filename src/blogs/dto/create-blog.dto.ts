import { IsString } from '@nestjs/class-validator';

export class CreateBlogDto {
  @IsString()
  content: string;
}