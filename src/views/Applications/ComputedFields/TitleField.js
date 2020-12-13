import React, { useEffect } from "react"
import { FormInput } from "shards-react"

const TitleField = props => {
  useEffect(() => {
    if (props.values.staff_id ) {
      let employee = props.data.filter( value => value.staff_id === props.values.staff_id )

      if( employee ){
        props.setFieldValue("title", employee[0].designation.toUpperCase() )
      } 
    }
    
  }, [props.values.staff_id]);

  return (
    <FormInput
      id="title"
      name="title"
      placeholder="Title"
      value={props.values.title}
      disabled
  />
  )
}

export default TitleField 