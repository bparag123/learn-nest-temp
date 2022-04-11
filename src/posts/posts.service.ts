import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.model';
@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private readonly postModel: typeof Post) {}

  //Creating Post
  create(createPostDto: CreatePostDto) {
    const user = this.postModel.create(createPostDto, { include: [User] });
    return user;
  }

  //Getting all Posts
  findAll() {
    return this.postModel.findAll({
      include: [{ model: User, attributes: ['email', 'id'] }],
      attributes: { exclude: ['userId'] },
    });
  }

  //Get One Post by ID
  findOne(id: number) {
    return this.postModel.findOne({
      where: { id },
      include: [{ model: User, attributes: ['email', 'id'] }],
      attributes: { exclude: ['userId'] },
    });
  }

  //Updating the Post
  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.postModel.findOne({ where: { id } });
    //Checking the Post Instance
    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    //Checking for the Authority
    if (userId !== post.userId) {
      throw new HttpException(
        'You have not access to this Operation',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await post.update(updatePostDto);
  }

  //Deleting the Post
  async remove(id: number, userId) {
    const post = await this.postModel.findOne({ where: { id } });
    //getting Post instance
    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    //Checking for the Authority
    if (userId !== post.userId) {
      throw new HttpException(
        'You have not access to this Operation',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await post.destroy();
  }

  //Getting the Posts of User
  findByUser(userId: number) {
    return this.postModel.findAll({
      where: { userId },
      attributes: { exclude: ['userId'] },
    });
  }
}
