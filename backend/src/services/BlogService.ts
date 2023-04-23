import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AuthService } from './AuthService';
import { CreateBlogDto } from '../dto/CreateBlogDto';
import { Blog } from '../entity/Blog';
import utils from '../helper/utils';

// Blog service some bussiness logic methods
export class BlogService {
  private readonly blogRepository: Repository<Blog>;

  constructor(blogRepository: Repository<Blog>) {
    this.blogRepository = blogRepository;
  }

  // Save new blog to database
  async store(blogData: CreateBlogDto): Promise<Blog> {
    if (!blogData.image) {
      throw new Error('Upload image for the blog');
    }
    const fileName = await utils.uploadFile(blogData.image, 'blogs');

    const newBlog: Blog = Object.assign(new Blog(), blogData);

    newBlog.image = fileName;

    return this.blogRepository.save(newBlog);
  }

  // Get blog data by id
  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
    });

    if (blog) {
      return blog;
    }
    throw new Error('Blog not found');
  }

  // Update blog data
  async updateBlog(
    id: number,
    blogData: CreateBlogDto,
    authUser: User,
  ): Promise<Blog> {
    const blog = await this.blogRepository.findOneOrFail({
      where: { id },
    });

    if (blog.userId != authUser.id) throw new Error('Not authorized');

    let fileName: string;
    if (blogData.image) {
      fileName = await utils.uploadFile(blogData.image, 'blogs');
    }

    Object.assign(blog, blogData);

    if (fileName) blog.image = fileName;

    return this.blogRepository.save(blog);
  }
}
