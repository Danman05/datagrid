import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageInterface } from '../../../interfaces/image-interface';
import { MatButtonModule } from '@angular/material/button';

export type DialogDataSubmitCallback<T> = (row: T) => void;

@Component({
  selector: 'app-picture-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './picture-dialog.component.html',
  styleUrl: './picture-dialog.component.css'
})

export class PictureDialogComponent {

  input: FormControl = new FormControl('');
  newFiles: ImageInterface[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { callback: DialogDataSubmitCallback<any>; defaultValue: FileList },
    private dialogRef: MatDialogRef<PictureDialogComponent>
  ) { }

  ngOnInit() {
    if (this.data.defaultValue) {
      this.input.patchValue(this.data.defaultValue);
      Array.from(this.data.defaultValue).forEach(file => {

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;

          this.newFiles.push({name: "SampleImage", src: base64String}),
          console.log(base64String);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }
  }
  submitDialog() {
    this.data.callback(this.newFiles)
  }
}
