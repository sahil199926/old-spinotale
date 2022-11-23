import { GET_START_END_DATE } from '../../redux/actions/DateFilter'

let today = new Date();
let priorDate = new Date(new Date().setDate(today.getDate() - 360));
let priorDate1 = new Date(new Date().setDate(today.getDate() - 60));

const initialState = {
  // currStartEndDate: [priorDate, priorDate1],
  // preStartEndDate: [today, priorDate],
  currStartEndDate: { endDate: priorDate1 , startDate: priorDate },
  preStartEndDate:  { endDate: '', startDate: '' },
  comparision: false,
  clickByRedux: false,
}

const DateFilterReducer = function (state = initialState, action) {
  console.log(action, 'action.payload')
  switch (action.type) {
      case GET_START_END_DATE: {
        return {...action.payload}
    }
    default: {
      return  {...state}
    }
  }
}

export default DateFilterReducer;


