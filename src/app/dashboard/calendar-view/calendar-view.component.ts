import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { DateInMonth } from 'src/app/DateInMonth';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  @Input() monthIndex;
  @Input() year;
  @Input() city;

  weekHeader = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // assign user selected date to selectedDate
  selectedDate: any;

  // use dateObj to store DateInMonth objects
  dateObj: Array<Array<DateInMonth>> = Array();

  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  responseDateObjs: Map<any, any> = new Map();

  constructor(private holidayServiceObj: HolidayService) {

  }

  /**
   * Generate month when year or monthIndex or city changes
   */

  ngOnChanges(changes: SimpleChanges): void {

  }


  ngOnInit() {
    this.holidayInitializer()
    this.monthGenerator()
  }

  /**
   *  Generate the data for the 42 cells in the table
   *  Property "enabled" to be true for the current month
   *  After generating fetch holiday list.
   */
  monthGenerator() {
    let daysInMonth = this.daysInMonth(this.monthIndex)
    
    let cellPushed = 0;
    let cellDay = 1


    let fullArray = new Array();
    for(let j=0;j<6;j++){
      let weekArray = new Array();

    for(let i=0;i<7;i++){
      let dateInMonth = new DateInMonth();
      dateInMonth.date = cellDay.toString()
      dateInMonth.enabled = true;
      
      cellPushed++;
      if(cellPushed > daysInMonth){
        dateInMonth.enabled = false;
      }
      if(cellDay === daysInMonth){
        cellDay = 0;
      }
      cellDay ++
      weekArray.push(dateInMonth);
    }
    fullArray.push(weekArray)
  }

  this.dateObj = fullArray

  }

  daysInMonth(monthIndex){
    if(monthIndex + 1 === 4 || monthIndex + 1 === 6 || monthIndex + 1 === 9 || monthIndex + 1 === 11){
      return 30;
    } else if(monthIndex + 1 ===2 ){
      return 29;
    } else{
      return 31
    }
  }


  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  holidayInitializer() {
    this.holidayServiceObj.getHolidays(this.city,this.monthIndex,this.year).subscribe((data : any)=>{
      data.forEach(element => {
        this.responseDateObjs.set(element.date,element)
      });
    })
 
  }
}
