import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      // If it's already a BadRequestException, re-throw it
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Handle database connection or other errors
      throw new BadRequestException(
        'Could not create user. Please try again later.',
      );
    }
  }

  public async findById(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch {
      throw new BadRequestException(
        'Could not find user. Please try again later.',
      );
    }
  }

  public async findAll() {
    try {
      const users = await this.usersRepository.find();

      return users;
    } catch {
      throw new BadRequestException(
        'Could not retrieve users. Please try again later.',
      );
    }
  }

  public async createManyUsers(users: CreateUserDto[]) {
    //Create Query Runner Instance
    // connect query runner to datasourace
    // create transaction
    // insert users
    // commit transaction
    // return users.length

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const user of users) {
        const newUser = queryRunner.manager.create(User, user);

        return await queryRunner.manager.save(newUser);
      }
      await queryRunner.commitTransaction();
      return users.length;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
