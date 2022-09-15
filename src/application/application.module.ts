import { Module, Global } from '@nestjs/common';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './users/users.module';
import { SongsModule } from './songs/songs.module';

@Global()
@Module({
  imports: [GenresModule, UsersModule, SongsModule],
  controllers: [],
  providers: [],
  exports: [GenresModule, UsersModule, SongsModule],
})
export class ApplicationModule {}
