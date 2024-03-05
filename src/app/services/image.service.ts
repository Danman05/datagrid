import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { ImageInterface } from '../interfaces/image-interface';

@Injectable({
  providedIn: 'root'
})

// Image service, main collection for images$
// images$ is a shared collection for every component
export class ImageService {


  private images: ImageInterface[] = [];
  private imageSubject$: Subject<ImageInterface[]> = new BehaviorSubject<ImageInterface[]>(this.images);
  images$: Observable<ImageInterface[]> = this.imageSubject$.asObservable();

  // Add new image to the observable
  newImage(image: ImageInterface): void {
    this.images.push(image);
    this.imageSubject$.next(this.images);
  }
}
