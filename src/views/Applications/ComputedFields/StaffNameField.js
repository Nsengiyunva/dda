import React, { useEffect, useState } from "react"
import {
  FormInput,
} from "shards-react"
import { useDispatch } from 'react-redux'
import { sendStaffId } from '../../../_actions'

const StaffNameField = props => {
  const dispatch = useDispatch() 

  useEffect(() => {
    if (props.values.staff_id ) {
      let employee = props.data.filter( value => value.staff_id === props.values.staff_id )
      if( employee ){
        props.setFieldValue("name", employee[0].first_name.toUpperCase() + ' '  + employee[0].last_name.toUpperCase() + ' ' + employee[0].others.toUpperCase() )
      } 
    }
    // dispatch( sendStaffId( props.values.staffid ) )
    
  }, [props.values.staff_id]);

  return (
    <FormInput
      id="name"
      name="name"
      placeholder="Staff Name"
      value={props.values.name}
      disabled
  />
  )
}

export default StaffNameField 