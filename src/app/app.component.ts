import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './input/input/input.component';
import { CalcComponent } from './calc/calc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, CalcComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator';
}
