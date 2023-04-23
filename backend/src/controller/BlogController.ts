import { AppDataSource } from '../config/data-source';
import { NextFunction, Request, Response } from 'express';
import { Blog } from '../entity/Blog';
import { validateRequest } from '../helper/validator';
import { CreateBlogDto } from '../dto/CreateBlogDto';
import { User } from '../entity/User';
import { BlogService } from '../services/BlogService';
import { UpdateBlogDto } from '../dto/UpdateBlogDto';

// Controller for blogs
export class BlogController {
  private blogRepository = AppDataSource.getRepository(Blog);
  private readonly blogService: BlogService;

  constructor() {
    this.blogService = new BlogService(this.blogRepository);
  }

  // Get all blogs, filter them by user id and limit
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const { limit, userId } = request.query;
      if (
        (userId && isNaN(Number(userId))) ||
        (limit && isNaN(Number(limit)))
      ) {
        return response.status(400).json({
          status: 400,
          message: 'Invalid params',
        });
      }
      const take = limit ? Number(limit) : 20;
      const where = userId ? { userId: Number(userId) } : {};

      const blogs = await this.blogRepository
        .createQueryBuilder('blog')
        .select([
          'blog.id',
          'blog.title',
          'blog.description',
          'blog.image',
          'blog.userId',
        ])
        .leftJoinAndSelect('blog.user', 'user')
        .where(where)
        .take(take)
        .getMany();

      return response.json(blogs);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Get one spesific blog data via id number
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const blog = await this.blogService.getBlogById(id);
      return response.status(200).json(blog);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Create blog
  async create(request: Request, response: Response, next: NextFunction) {
    const errors = await validateRequest(CreateBlogDto, request.body);
    if (errors.length > 0) {
      return response
        .status(400)
        .json({ message: 'Validation failed', errors });
    }

    try {
      const blogData: CreateBlogDto = request.body;
      const authUser: User = request['user'] as User;
      blogData.userId = authUser.id;

      const blog = await this.blogService.store(blogData);
      return response.status(200).json(blog);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Update blog data by id number
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const errors = await validateRequest(UpdateBlogDto, request.body);
      if (errors.length > 0) {
        return response
          .status(400)
          .json({ message: 'Validation failed', errors });
      }

      const authUser: User = request['user'] as User;
      const id = parseInt(request.params.id);
      const blogData: CreateBlogDto = request.body;

      const blog: Blog = await this.blogService.updateBlog(
        id,
        blogData,
        authUser,
      );

      return response.status(200).json(blog);
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  // Remove a blog
  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const authUser: User = request['user'] as User;
      const id = parseInt(request.params.id);
      const blog = await this.blogService.getBlogById(id);

      if (!blog) {
        return response.status(401).json({ message: 'Blog not found' });
      }

      if (blog.userId != authUser?.id) {
        return response.status(401).json({ message: 'Not authorized' });
      }

      await this.blogRepository.remove(blog);
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}
