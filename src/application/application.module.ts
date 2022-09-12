import { Module } from '@nestjs/common';
import { GeneresModule } from './generes/generes.module';
import { UsersModule } from './users/users.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [GeneresModule, UsersModule, SongsModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
