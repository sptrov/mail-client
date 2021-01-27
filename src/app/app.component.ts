import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmailModel } from './models/email.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  email: EmailModel = new EmailModel();
  title = 'mail-client';
  isSingleSchedule = true;
  emailAddresses: String = '';
  emailSubject: String = '';
  emailMessage: String = '';
  singleEmailDatePicked = new Date();
  isSingleLater: Boolean = false;
  singleNowOrLater: String = "now"
  dayMonthYearPick: String = "day";
  selectedDays = [];
  multiEmailTimePicked;
  numberOfTimes:String = "1";
  dayOfTheMonth:String = "1";
  limit: String = "";
  limitNever: String = '';
  isSelected = true;

  daysList = [
    { "id": 0, "itemName": "Sunday", "name": "Sun" },
    { "id": 1, "itemName": "Monday", "name": "Mon" },
    { "id": 2, "itemName": "Tuesday", "name": "Tue" },
    { "id": 3, "itemName": "Wednesday", "name": "Wed" },
    { "id": 4, "itemName": "Thursday", "name": "Thu" },
    { "id": 5, "itemName": "Friday", "name": "Fri" },
    { "id": 6, "itemName": "Saturday", "name": "Sat" }
  ];
  daysListSettings = {
    enableSearchFilter: true,
    addNewItemOnFilter: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    classes: "myclass custom-class",
    text: "Select Days"
  };

  constructor(
    private apiService: ApiService,
    public translate: TranslateService

    // public httpService: HttpService
  ) {
    translate.setDefaultLang('en');
    // translate.addLangs(['en', 'de']);
  }
  ngOnInit() {


  }

  singleNowOrLaterChanged($event) {
    if (this.singleNowOrLater == "later") {
      this.isSingleLater = true;
    } else {
      this.isSingleLater = false
    }
  }
  validateNumberOf() {
    setTimeout(() => {
      if (this.dayMonthYearPick == "week" && +(this.numberOfTimes) > 1) {
        this.numberOfTimes = "1";
      }
    });
  }
  validateDayOfTheMonth(){
    setTimeout(() => {
      if (this.dayOfTheMonth  && (+(this.dayOfTheMonth) > 31 
        || +(this.dayOfTheMonth) < 1) ) {
        this.dayOfTheMonth = "1";
      }
    });
  }

  switchSchedule(event) {
    // event.preventDefaults();
    this.isSingleSchedule = !this.isSingleSchedule;
  }
  scheduleEmail() {
    this.email.to =   this.emailAddresses;
    this.email.subject = this.emailSubject;
    this.email.body = this.emailMessage;

    if (this.isSingleSchedule) {

      this.email.schedule.type = 'now';
      if (this.isSingleLater) {

        const time = this.singleEmailDatePicked;
        this.email.schedule.second = time.getSeconds().toString();
        this.email.schedule.minute = time.getMinutes().toString();
        this.email.schedule.hour = time.getHours().toString();
        this.email.schedule.dayOfMonth = time.getDate().toString();
        this.email.schedule.month = (time.getMonth() + 1).toString()
        this.email.schedule.year = time.getFullYear().toString();
        this.email.schedule.type = 'later'
      }

    } else {

      let time = this.multiEmailTimePicked;

      const daysOfWeek = [];
      this.selectedDays.forEach((day) => {
        daysOfWeek.push(day.name)
      })
      const daysOfWeekStr = daysOfWeek.toString();

      this.email.schedule.period = this.dayMonthYearPick;
      if(this.email.schedule.period != 'hour') {
        this.email.schedule.second = time.getSeconds().toString();
        this.email.schedule.minute = time.getMinutes().toString();
        this.email.schedule.hour = time.getHours().toString();
      }

      if(this.email.schedule.period == 'month') {
        this.email.schedule.dayOfMonth = this.dayOfTheMonth;
      }
      this.email.schedule.type = 'recurring'

      this.email.schedule.numberOfTimes = this.numberOfTimes;

      this.email.schedule.daysOfWeek = daysOfWeekStr;

      this.email.schedule.limit = this.limit;

    }
    this.apiService.saveEmailDefinition(this.email).subscribe(
      (result) => {
        window.location.reload();

      },
      (errorResponse) => {
        console.log(errorResponse)
      }
    );

    console.log(this.email)


  }
}
