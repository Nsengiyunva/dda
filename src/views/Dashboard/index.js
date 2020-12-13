import React, { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import BarChart from './BarChart'
import Axios from 'axios'
import moment from 'moment'

import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react'

import './Dashboard.css'
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';

 
export default props => {
  const [ chartData, setChartData ] = useState({ paid: 0, unpaid: 0, contract: 0, casual: 0, permanent: 0, employeeYears: [] })
  const [ gender, setGender ] = useState()
  const [ totals, setTotals ] = useState()
  const [ category, setCategory ] = useState()
  useEffect( () => {
    Axios.get("http://154.72.194.200:3000/api/auth/genderAnalysis").then(
      response => {
        let values = {}
        response.data.forEach( item => {
          values = { ...values, [item.gender]: item.total }
        })
        setGender( values )
        
      }
    ).catch( error => { alert( 'Error occured on the server') })


    Axios.get("http://154.72.194.200:3000/api/auth/paymentAnalysis").then(
      response => {
        response.data.map( value => {
            setTotals( { 
              due: value.total_due, 
              paid: value.total_paid 
            } ) 
        })
      }
    ).catch( error => { alert( 'Error occured on the server') })


    Axios.get("http://154.72.194.200:3000/api/auth/categoryAnalysis").then(
      response => {
        let values = {}
        response.data.forEach( value => {
          values = { ...values, [value.applicantCategory]: value.total }
        })
        setCategory( values )
      }
    ).catch( error => { alert( 'Error occured on the server') })

  },[])


  if( !totals?.due || !totals?.paid ){
    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            Loading...
          </Col>
        </Row>
      </Container>
    )
  }


  return (
    <Container fluid className="main-content-container px-4">
       <Row>
        <Col md={12} lg={12}>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6>Summary Charts Data</h6>
            </CardHeader>
            <CardBody>
              <Row form>
                <Col md="3">
                  <h6>Gender Analysis</h6>
                  <PieChart
                      data={[
                        { title: 'MALES', value: gender?.Male, color: '#D05FEF' },
                        { title: 'FEMALES', value: gender?.Female, color: '#EACF0C' },
                      ]}
                    animate={true}
                    label={ (val) => {
                      let { dataEntry : { title, value } } = val
                      return title.toUpperCase() + ` :${value}`
                    }}
                    />
                </Col>

                <Col md="3" className="ml-5 mr-5">
                <h6>Payment Analysis</h6>
                 <PieChart
                    data={[
                      { title: 'PAID', value: totals?.paid , color: '#34F3D6' },
                      { title: 'DUE', value: totals?.due, color: '#CEE510' },
                    ]}
                  animate={true}
                  label={ (val) => {
                    let { dataEntry : { title, value } } = val
                    return title.toUpperCase() + ` :${parseFloat( value ).toLocaleString()}`
                  }}
               />
              </Col>

              <Col md="3" className="ml-5 mr-5">
                <h6>Category Analysis</h6>
                 <PieChart
                    data={[
                      { title: 'Group', value: category?.Group , color: '#F2F52F' },
                      { title: 'Individual', value: category?.Individual, color: '#1DD5E8' },
                      { title: 'Company', value: category?.Company, color: '#27A0EF' },
                    ]}
                  animate={true}
                  label={ (val) => {
                    let { dataEntry : { title, value } } = val
                    return title.toUpperCase() + ` :${ parseFloat( value ).toLocaleString()}`
                  }}
               />
              </Col>
              </Row>
            </CardBody>
           </Card>
          </Col>
      </Row>
      
      {/* <Row>
        <Col md={5} lg={5}>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Applicant Payments</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3 pr-3 pl-3">
              <PieChart
                    data={[
                      { title: 'AMOUNT PAID', value: chartData.paid , color: 'purple' },
                      { title: 'AMOUNT DUE', value: chartData.unpaid, color: 'yellow' },
                    ]}
                  animate={true}
                  label={ (val) => {
                    let { dataEntry : { title, value } } = val
                    return title.toUpperCase() + ` :${value}`
                  }}
              />
                
            </CardBody>
          </Card>
        </Col>

      </Row> */}

    </Container>
  )
}
