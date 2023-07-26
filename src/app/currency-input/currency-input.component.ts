import { Component } from '@angular/core';
import {CurrencyInputService} from "./currency-input.service";
import {MatDialog} from "@angular/material/dialog";
import {ResultDialogComponent} from "./result-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrencyService} from "../currency-service/currency-service.service";

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
})
export class CurrencyInputComponent {
  name: string='';
  currencyCode: string='';
  surname: string='';
  currencyValue?: number =0;

  constructor(private currencyService: CurrencyService,private currencyInputService: CurrencyInputService,public dialog: MatDialog,private snackBar: MatSnackBar) {}

  getCurrentCurrencyValue() {
    console.log(this.name, this.currencyCode, this.surname);
    this.currencyService
    .getCurrentCurrencyValue(this.name, this.currencyCode, this.surname)
    .subscribe({next: (response) => {
        this.currencyInputService.sendCurrencyInputData(response);
        this.currencyValue = response.currencyRate;
        this.openResultDialog();
      },
      error: (error) => {
        this.snackBar.open(this.getErrorMessage(error.error), 'Close', {
          duration: 5000,
        });
      }
      }
    );
  }

  getErrorMessage(msg: string){
    if(msg === 'CURRENCY_NOT_FOUND'){
      return 'Currency not found';
    }else if(msg === 'LIMIT_REACHED'){
      return 'Limit reached';
    }else if (msg === 'NAME_SURNAME_MISSING'){
      return 'Name and surname are missing';
    }else if(msg === 'BAD_REQUEST'){
      return 'Bad request';
    }else if(msg === 'CURRENCY_CODE_EMPTY') {
      return 'Currency code is empty';
    }
    return "Internal server error. Try again later.";
  }
  openResultDialog(): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: '300px',
      data: {
        name: this.name,
        currencyCode: this.currencyCode,
        surname: this.surname,
        currencyValue: this.currencyValue,
      },
    });
  }
}
