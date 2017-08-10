import { Controller, Get, Post, Response, Param, HttpStatus } from '@nestjs/common';

@Controller('photos')
export class PhotoController {
  @Get()
  public getAllPhotos(req: any, res: any): void {
    console.log('getAllPhotos');
  }

  @Get('/:id')
  public async getUser( @Response() res: any, @Param('id') id: any): Promise<void> {
    res.status(HttpStatus.OK).json({ aaa: '123' });
  }

  @Post()
  public addPhoto(req: any, res: any): void {
    console.log('addPhoto');
  }
}
