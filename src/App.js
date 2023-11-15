
import { Routes,Route, useNavigate, } from "react-router-dom";
import { useReducer,createContext, useState, useEffect } from "react";
// import axios from 'axios'
import Axiosinstance from "./services/axiosConfig";
import Login from "./components/Auth/Login";
import Home from "./containers/home";
import { getUser } from "./components/Auth/Login";
import { getCartItems } from "./components/User/cart";
import Cart from "./components/User/cart";
import Navigator from "./components/navBar/navBar";
import Register from "./components/Auth/register";
import WorkSpaceForm from "./components/workSpace/workSpaceForm";
import WorkSpaceList from "./components/workSpace/workSpacesListing";
import WorkSpaceDetails from "./components/workSpace/workSpaceDetails";
import UserWorkSpaces from "./components/User/userWorkSpaces";
import ShowWorkSpace from "./components/User/showWorkSpace";
import MapViewSpace from "./components/User/mapview";
import Success from "./components/Payment/success";
import Cancel from "./components/Payment/cancel";
import Footer from "./components/navBar/footer";
import EditWorkSpace from "./components/workSpace/edit-WorkSpace";
import ProfileAccount from "./containers/profile";
import DashBoard from "./containers/DashBoard";
import VerfiyBooking from "./containers/verfiyBook";
import ForgetPassword from "./context/forgetPassword";
import MobileVerify from "./context/mobile";
import ResetPassword from "./context/setPass";
import { getAccountDetails } from "./containers/profile";

  export const workSpaceContext = createContext()

  function reducer (state,action){

      switch (action.type){
            case "OWNER_SPACES" :{
                return {...state,workSpaces:action.payload}
            }
            case "OWNER_SPACES_ADD" :{
                return {...state,workSpaces:[...state.workSpaces,action.payload]}
            }
            case "OWNER_SPACES_UPDATE" :{
                return {...state,workSpaces:state.workSpaces.map((ele)=>ele._id === action.payload._id ? action.payload:ele)}
            }
            case "OWNER_SPACE_DELETE":{
              return {...state,workSpaces:state.workSpaces.filter((ele)=>ele._id !== action.payload._id)}
            }
            case "USER_DETAILS":{
              return {...state,userDetails:action.payload}
            }
            case "USER_WORK_SPACES":{
              return {...state,userWorkSpaces:action.payload}
            }
            case "PUBLIC_WORK_SPACES":{
              return {...state,publicspaces:action.payload}
            }
            case "CART_ITEMS":{
              return {...state,cartItems:action.payload}
            }
            case "OWNER_REVENUE":{
              return {...state,ownerRevenue:action.payload}
            }
            case "MAPS_WORKSPACES":{
              return {...state,maps:action.payload}
            }
            case "BOOKINGS":{
              return {...state,Bookings:action.payload}
            }
            case "OWNER_SPACES_ANALYSIS":{
              return {...state,ownerSpacesAnalysis:action.payload}
            }
            case "REMOVE_CART_ITEM":{
              return {...state,cartItems:state.cartItems.filter((ele)=>ele._id !== action.payload)}
            }
            case "ADMIN_USERS":{
              return {...state,adminUsers:action.payload}
            }
            case "PROFILE":{
              return {...state,profile:action.payload}
            }
            case "PROFILE_UPDATE":{
              return {...state,profile:{...state.profile,...action.payload}}
            }
            case "LOG_OUT":{
              return {...state,...action.payload}
            }
            default :{
                return {...state}
            }
      }

  } 


  export const getMapsWorkSpace = async (workSpacedispatch)=>{
    try{

      const response = await Axiosinstance.get(`/api/mapWorkSpaces`)

        if(response.status ===200){
                workSpacedispatch({type:"MAPS_WORKSPACES",payload:response.data})
        }

    }catch(e){
      console.log(e)
    }
  }

 
export const getBookings = async (workSpacedispatch)=>{
  try{

    const response = await Axiosinstance.get(`/api/bookings`,{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    })

    if(response.status ===200){
      console.log(response.data)
      workSpacedispatch({type:"BOOKINGS",payload:response.data})
    }



  }catch(e){

    console.log(e)


  }
}


export const getAllusers = async (workSpacedispatch)=>{

  try{

    const response = await Axiosinstance.get(`/api/users/allusers`,{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    })

    console.log(response.data,'all users data')
    if(response.status ===200){
      workSpacedispatch({type:"ADMIN_USERS",payload:response.data})
    }



  }catch(e){

    console.log(e)


  }

}


function App() {

  const navigate = useNavigate()

    const [workSpaceState,workSpacedispatch] = useReducer(reducer,{workSpaces:[],userDetails:{},userWorkSpaces:[],cartItems:[],maps:[],Bookings:[],ownerSpacesAnalysis:[],ownerRevenue:{},adminUsers:{},publicspaces:[],profile:{}})
     const [isLogged,setIslogged] = useState(false)

      console.log(workSpaceState)

     const handlelogin = (t)=>{
      setIslogged(t)
      if(t){
          navigate('/')
      }
     }

     const handleLogOut = () => { 
        localStorage.removeItem('token')
            navigate('/')
            setIslogged(false)
            workSpacedispatch({type:"LOG_OUT",payload:{Bookings:[],ownerRevenue:{},ownerSpacesAnalysis:[],userDetails:{},workSpaces:[]}})
            
      }
  
       useEffect(()=>{
        if(localStorage.getItem('token')){
          setIslogged(true)
          getUser(workSpacedispatch)
          
          getAccountDetails(workSpacedispatch)
          getAllusers(workSpacedispatch)
          getBookings(workSpacedispatch)
          if(workSpaceState.userDetails.role=== 'user'){

            getCartItems(workSpacedispatch)
          }
        }
        getMapsWorkSpace(workSpacedispatch)
       // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])

       console.log(workSpaceState,'after logout data')

  return (
    <div className="container mt-5" style={{minHeight:"600px"}}>
      <workSpaceContext.Provider value={{workSpaceState,workSpacedispatch}}>

       <div className="row">
        <div className="col-lg-12">
        <Navigator workSpaceState={workSpaceState}  handleLogOut={handleLogOut} isLogged={isLogged}/>
        </div>
       
        {/* <div className="col-lg-1">
                {isLogged && <p>Name:{ workSpaceState.userDetails?.username}</p>}
                {isLogged && <p>Email:{ workSpaceState.userDetails?.email}</p>}
                { isLogged &&<p>Role :{ workSpaceState.userDetails?.role}</p>}
        </div> */}
       </div>
      <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route exact path="/login" element={<Login handlelogin={handlelogin}/>}/>
         <Route exact path = "/register" element={<Register />}/>
          <Route  exact path="/addWorkSpace" element={<WorkSpaceForm />}/> 
          <Route  exact path="/allWorkSpaces" element={<WorkSpaceList />}/>
          <Route exact path= "/userWorkSpaces" element = {<UserWorkSpaces />}/>
          <Route exat path="/ShowWorkSpace/:id" element = {<ShowWorkSpace />}/>
          <Route exact path ="/WorkSpaceDetails/:id" element={<WorkSpaceDetails />}/>
          <Route exact path = '/success' element={<Success />}/>
          <Route exact path = '/cancel' element={<Cancel />}/>
          <Route exact path = '/cart' element = {<Cart />}/>
          <Route exact path='/profile' element={<ProfileAccount/>}/>
          <Route exact path="/mapViewSpaces" element={<MapViewSpace />}/>
          <Route exact path='/verfiyBooking' element={<VerfiyBooking/>}/>
          <Route exact path="/editWorkSpace/:id" element={<EditWorkSpace/>}/>
          
          <Route exact path='/dashboard' element={<DashBoard/>}/>
          <Route exact path='/forgotPassword' element={<ForgetPassword/>}/>
          <Route exact path='/mobileVerify' element={<MobileVerify />}/>
          <Route exact path='/setPassword' element={<ResetPassword />}/>
      </Routes>
      <Footer/>
      </workSpaceContext.Provider>
    </div>
  );
}

export default App;




