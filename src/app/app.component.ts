import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PictureGridComponent } from './Components/picture-grid/picture-grid.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PictureGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'datagrid';
}
