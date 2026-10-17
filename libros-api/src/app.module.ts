import { Module } from '@nestjs/common';
import { LibrosModule } from './libros/libros.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({ imports: [LibrosModule], controllers: [AppController], providers: [AppService] })
export class AppModule {}
