import { Module } from '@nestjs/common';
import { PhotoController } from '../controllers/photo';

@Module({
  controllers: [PhotoController]
})
export class ApplicationModule { }
