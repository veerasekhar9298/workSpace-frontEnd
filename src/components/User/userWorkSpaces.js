import axios from "axios";
import { useEffect,useContext, useState, } from "react";
import { workSpaceContext } from "../../App";
import UserWorkSpace from "./workspace";
// import ListingWorkSpaces from "../workSpace/listingWorkSpace";
// import SideBar from "./sidebarNav";
// import HomeCarousel from "../Booking/home-carousel";

 export const getWorkSpaces = async(workSpacedispatch,sort,filter)=>{

  try{
      const response = await axios.get(`http://127.0.0.1:3857/api/workSpace?sort=${sort}&filter=${filter}`,{
          headers:{
              Authorization:localStorage.getItem('token')
          }
      })
      if(response.status===200){
        console.log(response.data)
         
          workSpacedispatch({type:"USER_WORK_SPACES",payload:response.data})
      }

  }catch(e){

  }
}

function UserWorkSpaces (props){


    const {workSpacedispatch,workSpaceState} = useContext(workSpaceContext)

    const [sort,setSort] = useState('')
    const [filter,setFilter] = useState(!localStorage.getItem('token')? '4' : '')

    // const [avgRatings,setAvgRatings] = useState([])

    // const getWorkSpaces = async()=>{

    //     try{
    //         const response = await axios.get(`http://127.0.0.1:3857/api/workSpace?sort=${sort}&filter=${filter}`,{
    //             headers:{
    //                 Authorization:localStorage.getItem('token')
    //             }
    //         })
    //         if(response.status===200){
    //           console.log(response.data)
               
    //             workSpacedispatch({type:"USER_WORK_SPACES",payload:response.data})
    //         }

    //     }catch(e){

    //     }
    // }

    



    useEffect(()=>{
            getWorkSpaces(workSpacedispatch,sort,filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sort,filter])

    return (
      <div className="container" style={{ minHeight: "700px" }}>
        <div className="row mt-4 mb-2">
              <div className="col-lg-4"></div>
              <div className="col-lg-4"></div>
              <div className="col-lg-2">
              <select class="form-select fw-bold"  value={sort} onChange={(e)=>{setSort(e.target.value)}}>
              <option value="">Sort By</option>
              <option value="1">A-Z</option>
              <option value="2">Z-A</option>
              {/* <option value="3">Popular</option> */}
            </select>
              </div>
              <div className="col-lg-2">
              <select class="form-select fw-bold" value = {filter} onChange={(e)=>{setFilter(e.target.value)}}>
                <option value=''>Filter By</option>
                <option value="2">2 & more</option>
                <option value="3">3 & more</option>
                <option value="4">4 & more</option>
              </select>
              </div>
        </div>
        <div className="row">
          {   workSpaceState.userWorkSpaces.map((ele, i) => {
                
            return <UserWorkSpace  {...ele} key={i} />; 
          })}

         
        </div>
      </div>
    );
}

export default UserWorkSpaces;