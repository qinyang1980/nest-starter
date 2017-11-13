import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Component()
export class PhotoService {
  private _photos: Array<any> = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Alice Caeiro' },
    { id: 3, name: 'Who Knows' }
  ];

  public getAllPhotos(): Promise<any> {
    return Promise.resolve(this._photos);
  }

  public getPhoto(id: number): Promise<any> {
    const photo = this._photos.find((photo) => photo.id === id);
    if (!photo) {
      throw new HttpException('User not found', 404);
    }
    return Promise.resolve(photo);
  }

  public addUser(photo: any): Promise<any> {
    this._photos.push(photo);
    return Promise.resolve('created ok!');
  }
}
