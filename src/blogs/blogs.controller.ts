import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import {  UpdateBlogDto } from './dto/update-blog.dto';
import {CreateBlogDto} from './dto/create-blog.dto';
import { Blog } from './blog.entity';

@Controller('blog')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return await this.blogsService.create(createBlogDto,1);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return await this.blogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Blog> {
    return await this.blogsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto): Promise<void> {
    await this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.blogsService.delete(id);
  }
}