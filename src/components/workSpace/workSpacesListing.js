 import { useContext, useEffect } from "react"
 import axios from "axios"
 import WorkSpaceItem from "./workSpaceItem"
 import { workSpaceContext } from "../../App"
import AllWorkSpaceChart from "./allWorkSpaceChart"
import RevenueChart from "./revenue-Chart"






 function WorkSpaceList (props){


        const {workSpaceState,workSpacedispatch} = useContext(workSpaceContext)
       
    useEffect(()=>{
            axios.get(`https://sharespace-xwig.onrender.com/api/workSpace`,{
                headers: {
                  Authorization:localStorage.getItem('token')
                }})
              .then((response)=>{
                 workSpacedispatch({type:"OWNER_SPACES",payload:response.data})           
              })
              .catch((err)=>{
                    console.log(err)
              })
            axios.get(`https://sharespace-xwig.onrender.com/api/allworkSpaceAnalysis`,{
                headers: {
                  Authorization:localStorage.getItem('token')
                }})
              .then((response)=>{
                console.log(response.data)
                 workSpacedispatch({type:"OWNER_SPACES_ANALYSIS",payload:response.data})           
              })
              .catch((err)=>{
                    console.log(err)
              })
            axios.get(`https://sharespace-xwig.onrender.com/api/revenueallworkSpaceAnalysis`,{
                headers: {
                  Authorization:localStorage.getItem('token')
                }})
              .then((response)=>{
                console.log(response.data)
                 workSpacedispatch({type:"OWNER_REVENUE",payload:response.data})           
              })
              .catch((err)=>{
                    console.log(err)
              })


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

        return(<div className="row mt-5"> 
            <div className="col-lg-7">
                    <h4 className="display-6 text-center mb-4"> Listing of the WorkSpaces</h4>
                    {
                        workSpaceState.workSpaces.map((ele,i)=>{
                            return <WorkSpaceItem {...ele} key = {i} />
                        })
                    }
            </div>
            <div className="col-lg-5 mt-5 pt-5 ">
                    <h4 className="text-center mb-4 display-6"> Statistics</h4>   
                       { workSpaceState.ownerRevenue ?<RevenueChart data = {workSpaceState.ownerRevenue} workSpaces = {workSpaceState.workSpaces} /> :""}
                        {workSpaceState.ownerSpacesAnalysis ? <AllWorkSpaceChart data ={workSpaceState.ownerSpacesAnalysis} workSpaces = {workSpaceState.workSpaces}/>:""}
            </div>

        </div>)

 }


 export default WorkSpaceList