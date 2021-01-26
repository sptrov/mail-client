// import { DataService } from '../services/data/data.service';

export class ScheduleModel {

  second: String = '';
  minute: String  = '';
  hour: String  = '';
  dayOfMonth: String  = '';
  month: String  = '';
  daysOfWeek: String  = ''

  year: String  = '';

  numberOfTimes: String  = '' // every 2 hour
  period: String  = '' //houry daily weekly
  when:String = ''
  type:String = ''
  // constructor(init?: Object ) {
  //   if (!init) { return; }
  //   DataService.deserializeModel(this, init);
  // }
}