import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private currentInput: string = '';
  private currentInputSubject = new BehaviorSubject<string>('');
  currentInput$ = this.currentInputSubject.asObservable();

  setCurrentInput(value: string): void {
    const currentInput = this.currentInputSubject.getValue();
    this.currentInputSubject.next(currentInput + value);
  }

  private currentOperator: string | null = null; // Текущий оператор
  private firstOperand: number | null = null; // Первый операнд
  private secondOperand: number | null = null; // Второй операнд

  getCurrentInput(): string {
    return this.currentInputSubject.value;
  }

  clearInput(): void {
    this.currentInput = ''; // Очищаем текущее значение
    this.currentInputSubject.next(this.currentInput); // Обновляем значение в потоке
  }

  // В сервисе добавляем метод для удаления последнего символа
  removeLastInput(): void {
    const currentInput = this.getCurrentInput();
    this.currentInputSubject.next(currentInput.slice(0, -1)); // Удаляем последний символ
  }

  toggleSign(): void {
    const currentInput = this.currentInputSubject.getValue();
    console.log('Before toggleSign:', currentInput);

    if (currentInput) {
      if (currentInput.startsWith('-')) {
        this.currentInputSubject.next(currentInput.slice(1)); // Убираем знак минуса
      } else {
        this.currentInputSubject.next('-' + currentInput); // Добавляем знак минуса
      }
    } else {
      // Если input пустой, добавляем знак минуса
      this.currentInputSubject.next('-');
    }

    console.log('After toggleSign:', this.currentInputSubject.getValue());
  }

  calculatePercentage(): void {
    const currentInput = this.getCurrentInput();
    if (currentInput) {
      const numberValue = parseFloat(currentInput);
      if (!isNaN(numberValue)) {
        const percentageValue = (numberValue / 100).toFixed(2);
        this.currentInputSubject.next(percentageValue);
      }
    }
  }

  handleComma(): void {
    const currentInput = this.getCurrentInput();
    if (currentInput === '' || !currentInput.includes('.')) {
      this.currentInputSubject.next(currentInput + '.');
    }
  }

  setOperator(operator: string): void {
	const currentInput = this.getCurrentInput();
  
	if (currentInput) {
	  // Если уже есть предыдущий результат, обновляем первый операнд
	  if (this.firstOperand === null) {
		this.firstOperand = parseFloat(currentInput);
		this.currentOperator = operator;
		this.currentInputSubject.next(`${this.firstOperand} ${this.currentOperator}`); // Отображаем первую часть операции
		this.currentInputSubject.next(`${this.firstOperand} ${operator}`);

	  } else {
		// Выполняем вычисление с предыдущим оператором
		this.calculateResult(); // Выполняем вычисление
		this.currentOperator = operator; // Устанавливаем новый оператор
		this.currentInputSubject.next(`${this.firstOperand} ${this.currentOperator}`); // Обновляем отображение
		this.currentInputSubject.next(`${this.firstOperand} ${operator}`);

	  }
	}
  }
  

  calculateResult(): void {
	const currentInput = this.getCurrentInput();
  
	if (currentInput && this.firstOperand !== null && this.currentOperator) {
	  this.secondOperand = parseFloat(currentInput);
	  let result: number | null = null;
  
	  switch (this.currentOperator) {
		case '+':
		  result = this.firstOperand + this.secondOperand;
		  break;
		case '-':
		  result = this.firstOperand - this.secondOperand;
		  break;
		case '*':
		  result = this.firstOperand * this.secondOperand;
		  break;
		case '/':
		  if (this.secondOperand !== 0) {
			result = this.firstOperand / this.secondOperand;
		  } else {
			result = null; // Ошибка деления на 0
		  }
		  break;
	  }
  
	  if (result !== null) {
		const formattedResult = result % 1 === 0 ? result.toString() : result.toFixed(2);
		this.currentInputSubject.next(`${this.firstOperand} ${this.currentOperator} ${this.secondOperand} = ${formattedResult}`);
		// Обновляем первый операнд для возможных последующих вычислений
		this.firstOperand = parseFloat(formattedResult);
		this.currentOperator = null; // Сбрасываем текущий оператор
		this.secondOperand = null; // Сбрасываем второй операнд
	  } else {
		this.currentInputSubject.next('Ошибка');
	  }
	}
  }
  
}
