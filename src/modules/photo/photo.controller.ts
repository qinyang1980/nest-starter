import { Controller, Get, Post, Response, Body, Param, HttpStatus } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private _photoService: PhotoService) { }

  @Get()
  public async getAllPhotos(req: any, res: any): Promise<void> {
    const photos = await this._photoService.getAllPhotos();
    res.status(HttpStatus.OK).json(photos);
  }

  @Get('/:id')
  public async getPhoto( @Response() res: any, @Param('id') id: any): Promise<void> {
    const photo = await this._photoService.getPhoto(Number(id));
    res.status(HttpStatus.OK).json(photo);
  }

  @Post()
  public async addPhoto(req: any, @Response() res: any, @Body('photo') photo: any): Promise<void> {
    try {
      const msg = await this._photoService.addUser(photo);
      res.status(HttpStatus.CREATED).json(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
