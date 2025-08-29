import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
    constructor(private router: Router) {}

    NavegarRota(rota: string) {
      this.router.navigate([rota]);
    }
}
