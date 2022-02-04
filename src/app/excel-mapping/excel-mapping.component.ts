import { Component, OnInit } from '@angular/core';
import readXlsxFile from 'read-excel-file';
import { CurrencyExchangeService } from '../services/exchange-rates.service';

@Component({
  selector: 'app-excel-mapping',
  templateUrl: './excel-mapping.component.html',
  styleUrls: ['./excel-mapping.component.scss'],
})

export class ExcelMappingComponent implements OnInit {
  currencyRecords: any = [];
  destCurrency: string;
  rates: { [key: string]: number };

  excelRead(e: any) {
    let fileReaded: any;
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();
    this.currencyRecords = [];

    const schema = {
      Name: {
        prop: 'name',
        type: String,
        required: false,
      },
      Currency: {
        prop: 'currency',
        type: String,
        required: false,
      },
      Amount: {
        prop: 'amount',
        type: Number,
        required: false,
      },
      ConvertedAmount: {
        prop: 'convertedamount',
        type: Number,
        required: false,
      },
    };
    readXlsxFile(e.target.files[0], { schema }).then((data) => {
      if (data.rows) {
        for (let row of data.rows) {
          this.currencyRecords.push(row);
        }
      }
    });
  }

  convertCurrency() {
    // I am using exchange rate host API and it always provide the exchange rate
    // based on 'EUR' as base currency no matter what base currency passed to the
    // API. So, I am considering base currency as 'EUR' and handling accordingly.
    const base_curr = 'EUR';
    const to_curr = this.destCurrency;
    for (let row of this.currencyRecords) {
      const from_curr = row.currency;
      const amount = row.amount;
      let conversion_rate: any;
      if (from_curr == base_curr) {
        conversion_rate = this.rates[to_curr];
      } else if (to_curr == base_curr) {
        conversion_rate = 1 / this.rates[to_curr];
      } else {
        conversion_rate =
          this.rates[to_curr] / this.rates[from_curr];
      }

      row.convertedamount = (amount * conversion_rate).toFixed(2);
    }
  }

  loadConversionRates() {
    this.service
      .getRates()
      .subscribe((res) => (this.rates = res.rates));
  }

  getAllCurrenciesList(): string[] {
    return Object.keys(this.rates);
  }

  constructor(private service: CurrencyExchangeService) {}

  ngOnInit(): void {
    this.loadConversionRates();
  }

  clearData(){
    console.log("heelo ");
    window.location.reload();
  }
}
