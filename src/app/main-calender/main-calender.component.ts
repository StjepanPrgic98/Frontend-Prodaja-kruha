import { Component, ViewChild } from '@angular/core';
import { BsDatepickerConfig, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { hrLocale, defineLocale, listLocales } from 'ngx-bootstrap/chronos';
import { OrderService } from '../_services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-calender',
  templateUrl: './main-calender.component.html',
  styleUrls: ['./main-calender.component.css']
})
export class MainCalenderComponent {
  @ViewChild('dpr') dpr!: BsDaterangepickerDirective;
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  datepickerModel?: Date;
  daterangepickerModel?: Date[];

  dateChanged: boolean = false;

  date: any;

  bsConfig: Partial<BsDatepickerConfig> | undefined;
 
  constructor(private localeService: BsLocaleService, private orderService: OrderService, private router: Router) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];

    this.bsConfig = {
      containerClass: "theme-orange",
      daysDisabled: [0, 1, 3, 4, 6],
      showWeekNumbers: false
    };

    // Define and apply the Croatian locale
    defineLocale('hr', hrLocale);
    this.localeService.use('hr');
  }

  selectedDate: Date | undefined;

  onDateChange(date: Date): void {
    if (this.dateChanged == false) {
      this.dateChanged = true;
    } else {
      console.log('Selected date:', date);
      const dayName = date.toLocaleDateString('hr', { weekday: 'long' });
      const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      const utcDate = date.toISOString();
      console.log('Selected date in UTC:', utcDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Note: month is zero-based, so we add 1
      const day = date.getDate();

      const customDateString = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
      console.log(customDateString)

      this.orderService.SetOrderDate(customDateString, capitalizedDayName);
      this.router.navigateByUrl("orders")
    }
  }

  

  locale = 'hr';
  locales = listLocales();

  applyLocale(pop: any) {
    this.localeService.use(this.locale);
    pop.hide();
    pop.show();
  }

  ngOnInit() {
    // Apply the locale on component initialization
    this.localeService.use(this.locale);
  }
}
