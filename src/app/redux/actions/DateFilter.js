export const GET_START_END_DATE = 'GET_START_END_DATE'
export const GET_COMPARISION_STATUS = 'GET_COMPARISION_STATUS'

export const getStartDateAndEndDate = (data) => (dispatch) => {
  dispatch({
    type: GET_START_END_DATE,
    payload: data,
  })
}