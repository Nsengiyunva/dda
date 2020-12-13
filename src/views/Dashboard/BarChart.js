import React from 'react';
import { Bar } from 'react-chartjs-2';


const BarChart = props =>  {
    let labels = props.data.map( value => value.name ) 
    let values = props.data.map( value => value.years )

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'No. of years served so far',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: values
        }
      ]
    }
    return (
      <div>
        <Bar
          data={data}
          options={{
            title:{
              display:true,
              text:'Number of years served from to date',
              fontSize:14
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
//   }
}
export default BarChart