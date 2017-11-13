import { Module } from '@nestjs/common';
import { PhotoModule } from './photo';

@Module({
  modules: [PhotoModule]
})
export class ApplicationModule { }
