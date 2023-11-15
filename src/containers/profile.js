/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit'; 
  import { workSpaceContext } from '../App';
  import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

 import { useState,useEffect,useContext } from 'react';
//  import axios from "axios"
 import Axiosinstance from '../services/axiosConfig';
 import { Modal, Button } from 'react-bootstrap';
import { showAlert, showAlert2 } from '../components/Auth/Login';

export   const getAccountDetails = async (workSpacedispatch)=>{
  try{
      // const response = await axios.get(`http://127.0.0.1:3857/api/user/profile`,{
      //     headers:{
      //         Authorization:localStorage.getItem('token') 
      //     }
      // })
      const response = await Axiosinstance.get(`/api/user/profile`,{
          headers:{
              Authorization:localStorage.getItem('token') 
          }
      })
      if(response.status === 200){
          console.log(response.data,'profile page')
          // setProfile(response.data)
          workSpacedispatch({type:"PROFILE",payload:response.data})

      }

  }catch(e){
      console.log(e)

  }
}
  



 function ProfileAccount (props){

    const {workSpaceState,workSpacedispatch} = useContext(workSpaceContext)
    const {profile} = workSpaceState


    // const [profile,setProfile] = useState({})
    const [showModal, setShowModal] = useState(false);
 
    // const [editFormData,setEdit] = useState({
        
    // })

    // console.log(editFormData,"33")
      const [username,setUserName] = useState(workSpaceState.profile.username)
      const [firstName,setFirstName] = useState(workSpaceState.profile.firstName)
      const [lastName,setLastName] = useState(workSpaceState.profile.lastName)
      const [mobile,setMobile] = useState(workSpaceState.profile.mobile )
      const [email,setEmail] = useState(workSpaceState.profile.email )

    


const upcomingBookings = profile?.upcomingBookings || [];
// const bookingHistory = profile?.bookingHistory || [];
const allEvents = [...upcomingBookings]


  const calenderData =  allEvents.map((eventData) => ({
    id: eventData._id,
    title: eventData.workSpaceId.name,
    start: new Date(eventData.startDate),
    end: new Date(eventData.endDate),
  }))


console.log(calenderData,"calender DAta")


    const handleShowModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    // console.log(profile)

    const getAccountDetails = async (workSpacedispatch)=>{
        try{
            // const response = await axios.get(`http://127.0.0.1:3857/api/user/profile`,{
            //     headers:{
            //         Authorization:localStorage.getItem('token') 
            //     }
            // })
            const response = await Axiosinstance.get(`/api/user/profile`,{
                headers:{
                    Authorization:localStorage.getItem('token') 
                }
            })
            if(response.status === 200){
                console.log(response.data,'profile page')
                // setProfile(response.data)
                workSpacedispatch({type:"PROFILE",payload:response.data})

            }

        }catch(e){
            console.log(e)

        }
    }

    const handleEditProfile = async (e)=>{
            e.preventDefault()
      try{    
          const ediData = {username,firstName,lastName,email,mobile}
          console.log(ediData,)
          const response = await Axiosinstance.put(`/api/user/editProfile`,ediData,{
            headers:{
              Authorization: localStorage.getItem('token')
            }
          })  
          if(response.status ===200){
                showAlert('profile Data is updated successfully')
                setShowModal(false)
                  console.log(response.data)
                workSpacedispatch({type:"PROFILE_UPDATE",payload:response.data})

          }


      }catch(e){

          showAlert2('error in updating the Profile')
        console.log(e)


      }
    }


    


    useEffect(()=>{
        getAccountDetails(workSpacedispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    
    return <>
        <section style={{ backgroundColor: '#eee' }} className='my-3'>
      {profile && <MDBContainer className="py-5">
    
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <h5 className="text-primary my-3">Profile Details</h5>
                <button className='btn btn-danger m-3' onClick={handleShowModal}> Edit Profile</button>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold">Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-primary fw-bold">{`${profile?.firstName}  ${ profile?.lastName}`}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold">Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-primary fw-bold">{profile?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold">Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-primary fw-bold">{`+91 ${profile?.mobile}`}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-bold">UserName</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-primary fw-bold">{profile?.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
                
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="12">
            <MDBCard className="mb-4" style={{height:'auto'}}>
              <MDBCardBody className="text-center">
                        <h5>Upcomings  Bookings Calender </h5>
                    {calenderData.length >0 &&   <Fullcalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={"dayGridMonth"}
                        headerToolbar={{
                          start: "today prev,next",
                          center: "title",
                          end: "dayGridMonth,timeGridWeek,timeGridDay", 
                        }}
                        height={"90vh"}
                        events={calenderData}
                        eventContent={eventInfo => ({
                          html: `<div style="background-color: ${getRandomColor()}">${eventInfo.event.title}</div>`,
                        })}
                        slotDuration="00:30:00" 
                        
                      />}
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          
        </MDBRow>
        <MDBRow>
          <MDBCol lg="6">
            <MDBCard className="mb-4" style={{height:'auto'}}>
              <MDBCardBody className="text-center">
                        <h5> Upcoming Bookings </h5>
                        {
                          profile?.upcomingBookings?.length > 0 ?  profile?.upcomingBookings.map((ele,i)=>{
                              return <div key={i} className='bg-primary bg-opacity-25 p-2 my-3 rounded-3 shadow'>
                                  <h6 className='py-2'><span className='text-danger'>workSpace</span>:{ele.workSpaceId.name}</h6>
                                  <h6 className='py-2'><span className='text-danger'>startDate</span>:{new Date(ele.startDate).toLocaleString()}</h6>
                                  <h6 className='py-2'><span className='text-danger'>EndDate</span>:{new Date(ele.endDate).toLocaleString()}</h6>
                              </div>
                          }): "No Upcoming Bookings"
                        }
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="6">
          <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                        <h5>  Bookings History </h5>
                        {
                          profile?.bookingHistory?.length > 0 ?  profile?.bookingHistory.map((ele,i)=>{
                              return <div key={i} className='bg-primary bg-opacity-25 p-2 my-3 rounded-3 shadow'>
                                  <h6 className='py-2'><span className='text-danger'>workSpace</span>:{ele.workSpaceId.name}</h6>
                                  <h6 className='py-2'><span className='text-danger'>startDate</span>:{new Date(ele.startDate).toLocaleString()}</h6>
                                  <h6 className='py-2'><span className='text-danger'>EndDate</span>:{new Date(ele.endDate).toLocaleString()}</h6>
                              </div>
                          }): "No History Bookings"
                        }
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>
        
      </MDBContainer>}


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='fw-bold'>
              <label> Username  <input type="text"name="username" value={username}  onChange={(e)=>{setUserName(e.target.value)}}className='form-control' /></label> <br/>
              <label> firstName  <input type="text"name="firstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className='form-control' /></label> <br/>
              <label> lastName  <input type="text"name="lastName" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className='form-control' /></label> <br/>
              <label> mobile  <input type="text"name="mobile" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} className='form-control' /></label> <br/>
              <label> Email <input type="text"name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='form-control' /></label> <br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProfile}>
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    </>
 }


 export default ProfileAccount