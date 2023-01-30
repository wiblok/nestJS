import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
constructor(
@InjectRepository(Blog)
private readonly blogRepository: Repository<Blog>,
) {}

async create(createBlogDto: CreateBlogDto, userId: number): Promise<Blog> {
const blog = new Blog();
blog.content = createBlogDto.content;

console.log("=============")
console.log(blog)

blog.user.id= userId;
return await this.blogRepository.save(blog);
}

async update( blogId: number,updateBlogDto: UpdateBlogDto): Promise<Blog> {
const blog = await this.blogRepository.findOneBy({ id: blogId});
if (!blog) {
throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
}
blog.content = updateBlogDto.content;
return await this.blogRepository.save(blog);
}

async delete(blogId: number): Promise<any> {
const blog = await this.blogRepository.findOneBy({ id: blogId});
if (!blog) {
throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
}
await this.blogRepository.delete(blogId);
return { message: 'Blog deleted successfully' };
}

findOne(id: number): any {
    return this.blogRepository.findOneBy({id:id});
  }


async findAll(): Promise<Blog[]> {
return await this.blogRepository.find();
}
}