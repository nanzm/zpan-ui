import moment from "moment";
// import { format, compareAsc } from 'date-fns'

const fmtTpl = "YYYY-MM-DD HH:mm:ss";

export function standardFormat(str: string) {
  return moment(str).format(fmtTpl);
}
