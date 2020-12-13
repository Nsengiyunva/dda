import React, { useEffect } from "react"
import { FormInput } from "shards-react"

const SalaryScaleField = props => {
  useEffect(() => {
    if (props.values.staff_id ) {
      let employee = props.data.filter( value => value.staff_id === props.values.staff_id )

      if( employee ){
        props.setFieldValue("salary_scale", employee[0].salary_scale )
      } 
    }
    
  }, [props.values.staff_id]);

  return (
    <FormInput
      id="salary_scale"
      name="salary_scale"
      placeholder="Salary Scale"
      value={props.values.salary_scale}
      disabled
  />
  )
}

export default SalaryScaleField 