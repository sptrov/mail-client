import { ScheduleModel } from './schedule.model'

export class EmailModel {

  to: String = '';
  subject: String  = '';
  body: String  = '';
  schedule: ScheduleModel = new ScheduleModel();
}