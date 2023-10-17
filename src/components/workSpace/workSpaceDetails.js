import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useParams,Link } from "react-router-dom";
import SpaceForm from "./spaceForm";
import { workSpaceContext } from "../../App";
import SpaceSlot from "./spaceSlot";
import SpaceMap from "./locationMap";
import BookItem from "./BookingItem";
import ChartAnalysis from "./spaceChart";
import ReviewWorkSpace from "./Reviews-Work";


 function WorkSpaceDetails (props){
    const {id} = useParams()
    const {workSpaceState} = useContext(workSpaceContext)
        const [workSpace,setWorkSpace] = useState({})
        console.log("Details WorkSpace",workSpace)
        const [spacetypes,setSpaceTypes] = useState([])

        const [desks,setDesks] = useState([])

        const [cabin,setCabin] = useState([])

        const [wanalysis,setWanalysis] = useState({})

       const [reviews,setReviews] = useState([])

        const getDetails = async ()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:3857/api/workSpace/${id}`,{
                    headers: {
                      Authorization:localStorage.getItem('token')
                    }})
                    if(response.status ===200){
                        setWorkSpace(response.data)
                    }


            }catch(e){

            }
        }

        const getSpacesDetails = (data)=>{
            setSpaceTypes([...spacetypes,data.spaceType])
            if(data.spaceType.name ==='desk'){
                setDesks([...desks,...data.createdSpaces])
            }else if(data.spaceType.name ==='cabin'){
                setCabin([...cabin,...data.createdSpaces])
            }
        }


        const avalilableList = (arr)=>{
            
            return arr.filter((ele)=>{return ele.isAvailable}).length
        }

        const occupiedList = (arr)=>{
            return arr.filter((ele)=>{return !ele.isAvailable}).length
        }

        const spaceEdit = (data)=>{

            if(data.spaceTypeId.name === "desk"){
                const result = desks.map((ele)=>{
                    if(ele._id===data._id){
                        return {...data}
                    }else{
                        return {...ele}
                    }
                } )
                setDesks(result)

            }else if(data.spaceTypeId.name === "cabin"){
                const result = cabin.map((ele)=>{
                    if(ele._id===data._id){
                        return {...data}
                    }else{
                        return {...ele}
                    }
                } )
                setCabin(result)
            }



        }

        const spaceDelete = (data)=>{

            if(data.spaceTypeId.name === "desk"){
                const result = desks.filter((ele)=>{
                   return ele._id !== data._id
                } )
                setDesks(result)

            }else if(data.spaceTypeId.name === "cabin"){
                const result = cabin.filter((ele)=>{
                    return ele._id !== data._id
                } )
                setCabin(result)
            }

        }

// console.log(workSpace)
        const analysis = async()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:3857/api/workSpaceanalysis/${id}`,{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                if(response.status === 200){
                    console.log(response.data)
                    setWanalysis(response.data)
                }

            }catch(e){

                console.log(e)
            }
        }

        const getReviews = async()=>{

            try{
                const response = await axios.get(`http://127.0.0.1:3857/api/reviews/${id}`,{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log("reviews",response.data)
                if(response.status ===200){
                        setReviews(response.data)
                }
    
    
            }catch(e){
    
                console.log(e)
    
            }
        }



    useEffect(()=>{
            getDetails()
            getReviews()
            // getBookings()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[id])
        useEffect(()=>{
            
            analysis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[desks,cabin])
    useEffect(()=>{
            const req1= axios.get(`http://127.0.0.1:3857/api/spaceType/${id}`,{
                headers: {
                  Authorization:localStorage.getItem('token')
                }})
            const req2 = axios.get(`http://127.0.0.1:3857/api/spaces/${id}`,{
                headers: {
                  Authorization:localStorage.getItem('token')
                }})
            axios.all([req1, req2])
                    .then(axios.spread((response1, response2) => {
                        setSpaceTypes(response1.data)
                       
                            const d = []
                            const c = []
                            response2.data.forEach((ele)=>{
                                if(ele.spaceTypeId.name ==='desk'){
                                    d.push(ele)
                                }else if(ele.spaceTypeId.name ==='cabin'){
                                   c.push(ele)
                                }
                            })
                            setDesks(d) 
                            setCabin(c)
                    }))
                    .catch(error => {
                        // Handle errors
                        console.error('Error:', error);
                    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            {/* <h2>{JSON.stringify(workSpace)}</h2> */}
            <div className="row my-1">
                <div className="col-lg-4">
                    <h2 className="display-4 text-center text-danger bg-success bg-opacity-25 rounded-3 shadow-lg p-3">{workSpace.name}</h2>
                </div>
                <div className="col-lg-4 d-flex mt-5 justify-content-center">
                    <h5 className="fw-bold mx-4"> Desks: <span className="mx-2">{desks.length}</span></h5>
                    <h5 className="fw-bold mx-4"> Cabins:<span className="mx-2">{cabin.length}</span></h5>
                </div>
                <div className="col-lg-4 d-flex justify-content-center">
                <button className="btn btn-warning m-5 fw-bold"> <Link className="text-decoration-none text-dark" to="/allWorkSpaces"> Back to WorkSpaces </Link> </button>
                </div>
            </div>
            <div className="row mt-3">
                    {
                      workSpace.images &&  workSpace.images.slice(0,3)?.map((ele,i)=>{
                            return <div className="col-lg-4" key={i}> <img src={ele} alt="space img" className="shadow-lg"  style={{objectFit:"cover",width:"400px", height:"350px",borderRadius:"10px"}}/></div>
                        })
                    }
            </div>
            <div className="row mt-4 shadow-lg">
                    {workSpace.address && <SpaceMap name={workSpace.address.name} lat={workSpace.address.latitude} lng={workSpace.address.longitude}/>}
            </div>
            <div className="row mt-5">
                    <div className="col-lg-6 mt-5">
                    <h5 className="m-5 fw-bold "><span className="text-success">Availability</span> :   Desks<span className="mx-4">{avalilableList(desks)}</span> Cabins<span className="mx-4">{avalilableList(cabin)}</span></h5>
                    <h5 className="m-5 fw-bold "><span className="text-danger mx-2">Occupied</span> :  Desks<span className="mx-4">{occupiedList(desks)}</span> Cabins<span className="mx-4">{occupiedList(cabin)}</span></h5>
                    </div>
                    <div className="col-lg-6">
                    {workSpaceState.userDetails && (
                                <SpaceForm id={id} getSpacesDetails={getSpacesDetails}  />
                                )}
                    </div>
            </div>
            <div className="row mt-4">
                    <div className="col-lg-6">
                        <h3 className="text-center display-5 mt-2 p-3 "> <span className="bg-info bg-opacity-25 rounded-5 shadow-lg p-3 m-2">Desks</span></h3>
                        <div className="row mt-5">
                            {desks.map((ele,i)=>{
                                return <SpaceSlot {...ele} key={i} num={i+1} spaceEdit={spaceEdit} spaceDelete={spaceDelete}/>
                            })}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center display-5 mt-2 p-3"> <span className="bg-info bg-opacity-25 rounded-5 shadow-lg p-3 m-2">Cabins</span></h3>
                        <div className="row mt-5">
                            {cabin.map((ele,i)=>{
                                return <SpaceSlot {...ele} key={i} num={i+1} spaceEdit={spaceEdit} spaceDelete={spaceDelete}/>
                            })}
                        </div>
                    </div>
            </div>

            <div className="row mt-4">
                            <div className="col-lg-8 bg-secondary bg-opacity-25 rounded-2">
                            <h2 className="display-3 m-3 text-center"> Bookings</h2>
                            {console.log(workSpace.bookings)}
                            <div className=" row m-3 d-flex">
                            {
                                workSpace.bookings?.length >0 && workSpace.bookings.map((ele,i)=>{
                                    return <BookItem ele ={ele} key = {i} />
                                })
                            }
                            </div>
                            </div>
                            <div className="col-lg-4 text-center">
                                <h2 className="display-6 my-5"> WorkSpace Analysis</h2>
                                    <ChartAnalysis data  ={wanalysis}/>
                            </div>

            </div>
            <div className="row bg-primary mt-4 bg-opacity-25 rounded-3">
                <ReviewWorkSpace reviews={reviews}/>
            </div>
          
        </>
    )
 }

 export default WorkSpaceDetails;