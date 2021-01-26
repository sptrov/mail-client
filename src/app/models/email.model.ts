import { ScheduleModel } from './schedule.model'

export class EmailModel {

  to: String = '';
  subject: String  = '';
  body: String  = '';
  schedule: ScheduleModel = new ScheduleModel();
  // constructor(init?: Object ) {
  //   if (!init) { return; }
  //   DataService.deserializeModel(this, init);
  // }
}