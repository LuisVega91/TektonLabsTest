import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from './../../server/logger/logger.service';
import { Genre } from './../genres/entities/genre.entity';
import { User } from './entities/user.entity';
import { hash } from '../../common/helpers';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    this.logger.log('Checking if email exist...');
    const emailAlreadyExists = !!(await this.userRepo.count({
      where: { email },
    }));
    if (emailAlreadyExists) {
      this.logger.error('The email already exists');
      throw new ConflictException('The email already exists');
    }
    this.logger.log('Creating user...');
    const newUser = this.userRepo.create(createUserDto);
    const hashPassword = await hash(newUser.password);
    newUser.password = hashPassword;
    await this.userRepo.save(newUser);
    this.logger.log('User created successfully');
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: [User.relations.preferences],
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: [User.relations.preferences],
    });
    if (!user) {
      this.logger.error(`User #${id} not found`);
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: [User.relations.preferences],
    });
    if (!user) {
      this.logger.error(`User email: ${email} not found`);
      throw new NotFoundException(`User email: ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (updateUserDto.preferencesIds) {
      const genres = await this.genreRepo.findBy({
        id: In(updateUserDto.preferencesIds),
      });
      user.preferences = genres;
    }
    this.userRepo.merge(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: number): Promise<{ affected }> {
    const { affected } = await this.userRepo.softDelete(id);
    return { affected };
  }
}
