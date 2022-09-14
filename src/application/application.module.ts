import { Module } from '@nestjs/common';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './users/users.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [GenresModule, UsersModule, SongsModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
