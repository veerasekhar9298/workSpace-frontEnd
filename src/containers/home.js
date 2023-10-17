import HomeCarousel from "../components/Booking/home-carousel"
import UserWorkSpace from "../components/User/workspace"
import Testimonial from "./testimonial"
 import axios from "axios"
import { workSpaceContext } from "../App"
import { useContext, useEffect } from "react"
 function Home (props){

    const {workSpaceState,workSpacedispatch} = useContext(workSpaceContext)

    
    const getWorkSpacesPublic = async()=>{


        try{
            const response = await axios.get(`https://sharespace-xwig.onrender.com/api/publicworkSpaces`)
            if(response.status===200){
              console.log(response.data)
               
                workSpacedispatch({type:"PUBLIC_WORK_SPACES",payload:response.data})
            }
      
        }catch(e){
      
        }
      }


   
        useEffect(()=>{
                getWorkSpacesPublic()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])






    return(<div className="container" style={{minHeight:'1000px'}}>
        <HomeCarousel/>
        <h1 className="my-3 py-2 display-3"> Place Where Dreams Comes to reality</h1>
        <div className="row d-flex">
        {   workSpaceState.publicspaces.map((ele, i) => {
                
                return <UserWorkSpace  {...ele} key={i} />; 
              })}
        </div>
        <Testimonial/>
    </div>)
 }

 export default Home