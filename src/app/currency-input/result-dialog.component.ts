import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-dialog',
  template: `<div style="display: flex; justify-content: center; align-items: flex-start; flex-direction: column; gap: 10px; padding: 20px;">
    <h3>Result</h3>
    <p>Name: {{ data.name }}</p>
    <p>Currency Code: {{ data.currencyCode }}</p>
    <p>Surname: {{ data.surname }}</p>
    <p>Currency Value: {{ data.currencyValue }} PLN</p>
    <button mat-button (click)="onCloseClick()">Close</button>
  </div>
  `,
})
export class ResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
