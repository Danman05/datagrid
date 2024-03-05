// Other imports
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// Service, Interfaces & Components
import { PictureDialogComponent } from './picture-dialog/picture-dialog.component';
import { ImageService } from '../../services/image.service';
import { ImageInterface } from '../../interfaces/image-interface';

// Animation
import { animate, state, style, transition, trigger } from '@angular/animations';

// Materials
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-picture-grid',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatDialogModule, MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './picture-grid.component.html',
  styleUrl: './picture-grid.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PictureGridComponent {

  constructor(private dialog: MatDialog, private imageService: ImageService) { }

  dataSource: Observable<ImageInterface[]> = this.imageService.images$;
  columnsToDisplay = ['name', 'src'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ImageInterface | null;

 
  // Method run when file(s) has been chosen. Open dialog and pass files
  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    this.dialog.open(PictureDialogComponent, {
      data: { callback: this.callBack.bind(this), defaultValue: files }
    });
    
  }
  
  // Add new images to the grid.
  // Data comes from dialog box
  callBack(image: ImageInterface[]) {
    image.forEach(element => {
      console.log(element);
      this.imageService.newImage(element);
    });
  }
}
