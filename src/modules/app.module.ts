import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CatsModule } from './photo/photo.module';
import { PhotoController } from './photo/photo.controller';

@Module({
    modules: [CatsModule]
})
export class ApplicationModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(LoggerMiddleware)
            .with('ApplicationModule')
            .forRoutes(PhotoController);
    }
}
