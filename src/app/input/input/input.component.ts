import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnInit {
  currentInput: string = ''; // Значение для отображения

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.calculatorService.currentInput$.subscribe((input) => {
      console.log('Received input:', input);
      this.currentInput = input; // Обновляем значение при изменении
    });
  }

  onNumberClick(num: string): void {
    this.calculatorService.setCurrentInput(num); // Добавляем число в сервис
  }
}
