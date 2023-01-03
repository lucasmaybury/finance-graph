import moment from "moment";

export function dateRange(startDate: Date, endDate: Date): Array<Date> {

  let startMoment = moment(new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth()));
  let endMoment = moment(endDate);
  let dates = [];

  if (endDate < startDate) {
    throw "End date must be greater than start date."
  }
  while (startMoment <= endMoment) {
    dates.push(startMoment.toDate());
    startMoment = startMoment.add(1, 'month')
  }
  return dates;
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];