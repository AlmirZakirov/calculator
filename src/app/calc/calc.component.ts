import { Component, HostListener } from '@angular/core';
import { CalculatorService } from '../services/calculator.service'; // Импортируем сервис

@Component({
  selector: 'app-calc',
  standalone: true,
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
})
export class CalcComponent {
  constructor(private calculatorService: CalculatorService) {}

  // Метод для обработки нажатия кнопок
  onNumberClick(num: string): void {
    this.calculatorService.setCurrentInput(num); // Добавляем число в сервис
  }

  onDeleteClick(): void {
    this.calculatorService.removeLastInput(); // Удаляем последний символ
  }

  onClearClick(): void {
    this.calculatorService.clearInput(); // Очищаем весь ввод
  }

  onToggleSignClick(): void {
    // console.log('Toggle Sign Clicked');
    this.calculatorService.toggleSign(); // Меняем знак числа
  }

  onPercentageClick(): void {
    this.calculatorService.calculatePercentage(); // Вычисляем процент
  }

  onCommaClick(): void {
    this.calculatorService.handleComma();
  }

  onOperatorClick(operator: string): void {
    this.calculatorService.setOperator(operator);
  }

  onEqualClick(): void {
    this.calculatorService.calculateResult();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent): void {
    const key = event.key;

    if (!isNaN(Number(key)) && key.length === 1) {
      this.onNumberClick(key); // Добавляем цифру в сервис
    } else if (key === 'Backspace') {
      this.onDeleteClick(); // Удаляем последний символ
    } else if (key === 'Escape') {
      // Используем 'Escape' для кнопки сброса
      this.onClearClick(); // Очищаем весь ввод
    } else if (key === '%') {
      this.onPercentageClick();
    } else if (key === ',') {
      this.onCommaClick();
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.onOperatorClick(key);
    } else if (key === 'Enter' || key === '=') {
      this.onEqualClick();
    }
  }
}
