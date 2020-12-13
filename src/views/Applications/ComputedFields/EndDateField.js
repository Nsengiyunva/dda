import React, { useEffect } from "react"
import { FormInput } from "shards-react"
import moment from 'moment'

const EndDateField = props => {
  useEffect(() => {
      let { fromdate, number_of_days }  = props.values
      let startdate = new Date( fromdate )
      let end = startdate.setDate( startdate.getDate() +  number_of_days )

      props.setFieldValue("end_date", moment( end ).format('DD-MM-YYYY') )
    
  }, [ props.values.fromdate, props.values.number_of_days ]);

  return (
    <FormInput
      id="end_date"
      name="end_date"
      placeholder="To Date"
      value={props.values.end_date}
      disabled
  />
  )
}

export default EndDateField 