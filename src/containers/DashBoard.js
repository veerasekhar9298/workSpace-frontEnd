import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,  
  } from 'mdb-react-ui-kit'; 
  
  import { ColumnChart,LineChart } from 'react-chartkick';
import 'chartkick/chart.js';

  import { workSpaceContext } from '../App';
  import { useContext } from 'react';

 function DashBoard (props){

  const {workSpaceState} = useContext(workSpaceContext)

  function getMonthName(monthNumber) {
    const date = new Date(2023, monthNumber, 1);
    return date.toLocaleString('en-US', { month: 'long' });
  }
  
  const chartData = workSpaceState.adminUsers?.chartData;
const columnChartData = chartData?.map(item => [
  getMonthName(item.month - 1),
  item.count
]) || []

const columnChartData2 = workSpaceState?.adminUsers?.transactionData?.monthlyData.map((item) => [getMonthName(item.month -1),item.transactions])
const columnChartData3 = workSpaceState?.adminUsers?.transactionData?.monthlyData.map((item) => [getMonthName(item.month -1),item.totalAmount])

    console.log(columnChartData2,"transation data chart")

    return ( 
        <div className="row mt-2">
         <h2 className="display-4 p-3 text-center"> DashBoard</h2>
         <section style={{ backgroundColor: '#eee' }} className='my-3'>
      <MDBContainer className="py-5">
    
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4" style={{height:'550px'}}>
              <MDBCardBody className="text-center">
                <h5 className="text-primary my-3 display-6">Revenue Details</h5>
                <h5 className='fw-bold'> Total Revenue:{workSpaceState?.adminUsers?.transactionData?.totalRevenue}</h5>
                  <LineChart data={columnChartData3}/>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-5 text-center" style={{height:"550px"}}>
              <MDBCardBody className="p-0">
                <h5 className="text-primary my-3 display-6">Transactions  Details</h5>
                    {/* {JSON.stringify(workSpaceState?.adminUsers?.transactionData)} */}
                    {columnChartData2 && columnChartData2.length > 0 && (
  <ColumnChart
    data={columnChartData2}
    xtitle="Month"
    ytitle="Transactions and Amount"
  />
)}
              </MDBCardBody>
            </MDBCard>
            {/* <MDBCard className="mb-4 mb-lg-5 text-center" style={{height:"550px"}}>
              <MDBCardBody className="p-0">
                <h5 className="text-primary my-3 display-6">  Details</h5>
               
                
              </MDBCardBody>
            </MDBCard> */}
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4" style={{height:"550px"}}>
              <MDBCardBody className='text-center '>
                  <h5 className="text-primary my-3 display-6"> Monthly Users Registration</h5>
                    {/* {JSON.stringify(workSpaceState.adminUsers?.allusers)} */}
                    <div className='mt-5 pt-5'>
                    <ColumnChart data={columnChartData} />
                    </div>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0" style={{height:"550px"}}>
                  <MDBCardBody className='text-center'>
                  <h5 className="text-primary my-3 display-6">Owners  Details</h5>
                       {
                        workSpaceState.adminUsers?.allusers?.filter((ele)=>ele.role==='owner').map((ele,i)=>{
                          return <p key={i} className='fw-bold'>{ele.username}</p>
                        })
                       }
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0" style={{height:"550px"}}>
                  <MDBCardBody className='text-center'>
                  <h5 className="text-primary my-3 display-6">Users  Details</h5>
                  {
                        workSpaceState.adminUsers?.allusers?.filter((ele)=>ele.role==='user').map((ele,i)=>{
                          return <p key={i} className='fw-bold'>{ele.username}</p>
                        })
                       }
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          {/* <MDBCol lg='4'>
          <MDBCard className="mb-4" style={{height:'150px'}}>
              <MDBCardBody className="text-center">
                <h5 className="text-primary my-3 display-6">workSpace Details</h5>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='4'>
          <MDBCard className="mb-4" style={{height:'150px'}}>
              <MDBCardBody className="text-center">
                <h5 className="text-primary my-3 display-6">workSpace Details</h5>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='4'>
          <MDBCard className="mb-4" style={{height:'150px'}}>
              <MDBCardBody className="text-center">
                <h5 className="text-primary my-3 display-6">workSpace Details</h5>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='4'>
          <MDBCard className="mb-4" style={{height:'150px'}}>
              <MDBCardBody className="text-center">
                <h5 className="text-primary my-3 display-6">workSpace Details</h5>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='4'>
          <MDBCard className="mb-4" style={{height:'150px'}}>
              <MDBCardBody className="text-center">
                <h5 className="text-primary my-3 display-6">workSpace Details</h5>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='4'>
          <MDBCard className="mb-4" style={{height:'150px'}}>
              <MDBCardBody className="text-center">
                <h5 className="text-primary my-3 display-6">workSpace Details</h5>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol> */}
        </MDBRow>
      </MDBContainer>
    </section>
        </div>
    )
 }


 export default DashBoard