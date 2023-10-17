import { useParams,Link } from "react-router-dom";
import { workSpaceContext } from "../../App";
import { useContext, useEffect, useState } from "react";

// import axios from 'axios'
import WorkSpaceForm from "./workSpaceForm";
function EditWorkSpace (props){
    const {id} = useParams() 
        const {workSpaceState,} = useContext(workSpaceContext)
        const selectedSpace = workSpaceState.workSpaces.find((ele)=>ele._id === id)
        const [isEdit,setIsEdit] = useState(false)


        // const getEditSpace = async ()=>{
        //     try{
        //         const response = await axios.get(`http://127.0.0.1:3857/api/EditworkSpace/${id}`,{
        //             headers:{
        //                 Authorization: localStorage.getItem('token')
        //             }
        //         })

        //         if(response.status ===200){
        //             console.log(response.data)
        //             setIsEdit(true)
        //         }

        //     }catch(e){

        //         console.log(e)



        //     }
        // }

        useEffect(()=>{
            if(Object.keys(selectedSpace).length >0){

                setIsEdit(true)
            }
                // getEditSpace()
        },[selectedSpace])

    return (
        <>
            <WorkSpaceForm isEdit={isEdit} selectedSpace={selectedSpace} />
          <button className="btn btn-warning m-5 fw-bold"> <Link className="text-decoration-none text-dark" to="/allWorkSpaces"> Back to WorkSpaces </Link> </button>
        </>
    )
}

export default EditWorkSpace;