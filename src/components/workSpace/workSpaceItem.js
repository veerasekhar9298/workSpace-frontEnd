    import { useContext } from "react"
    import axios from "axios"
    import { workSpaceContext } from "../../App"
    import { useNavigate } from "react-router-dom"

 function WorkSpaceItem (props){
    
        const {bookings,name,images,_id} = props
        const {workSpacedispatch} = useContext(workSpaceContext)
        const navigate = useNavigate()

        const handleDelete = (id)=>{
            axios.delete(`http://127.0.0.1:3857/api/workSpace/${id}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((response)=>{
                    console.log(response.data)
                    workSpacedispatch({type:"OWNER_SPACE_DELETE",payload:response.data})
                })
                .catch((err)=>{
                    console.log(err)
                })
        } 


        const handleDetails = (id)=>{
                navigate(`/WorkSpaceDetails/${id}`)
        }

        const handleEdit = (id)=>{
            navigate(`/editWorkSpace/${id}`)
        }


    return (
        <div className="bg-warning bg-opacity-25 rounded-3 my-4 p-5 row align-items-center ">
             <div className="col-lg-4">
             {
                   images.length >0 && 
                       <img  src={images[0]}  className="img-fluid" alt="workspace images" width="550px" height = "550px"/>
                   
                }
             </div>
             <div className="col-lg-4 text-center">
             
            {name&& <h5> {name}</h5>}
            <h6> Bookings : {bookings.length}</h6>
        
             </div>
             <div className="col-lg-4  text-center d-flex">
             <button className="btn btn-primary  fw-bold  p-1" onClick={()=>{handleDelete(_id)}}> Delete</button> 
             <button className="btn btn-primary  fw-bold mx-4 px-3" onClick={()=>{handleEdit(_id)}}> Edit</button> 
             <button className="btn btn-primary  fw-bold  p-1" onClick={()=>{handleDetails(_id)}} >  Details </button>
             </div>
               
        </div>
    )
 }

 export default WorkSpaceItem