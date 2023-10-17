import { useEffect,useState,useContext } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { workSpaceContext } from "../../App";
import SpaceMap from "../workSpace/locationMap";
import WorkspaceCarousel from "./imageCrosel";
import ReviewContainer from "../Review/reviewCon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCoffee, faParking, faShield } from '@fortawesome/free-solid-svg-icons';





 function ShowWorkSpace(props){
        const {id} = useParams()
        const navigate = useNavigate()

        const {workSpaceState} = useContext(workSpaceContext)
  
        const [workSpace,setWorkSpace] = useState({})

        const [spacetypes,setSpaceTypes] = useState([])

        const [desks,setDesks] = useState([])

        const [cabin,setCabin] = useState([])

        const [select,setSelect] = useState('')
        const [totalPrice, setTotalPrice] = useState(0)
        const [selectedDesk,setSelectedDesk] = useState(workSpaceState.cartItems.filter((ele)=>ele.productId === 9961&& ele.workSpaceId._id === id)[0]?.itemId || [])
        const [selectedCabin,setSelectedCabin] = useState(workSpaceState.cartItems.filter((ele)=>ele.productId === 9962 && ele.workSpaceId._id === id)[0]?.itemId|| [])
        const [startDate,setStartDate] = useState( workSpaceState.cartItems.filter((ele)=>ele.workSpaceId._id === id)[0]?.startDate.split("T")[0] || "")
        const [endDate,setEndDate] = useState(workSpaceState.cartItems.filter((ele)=>ele.workSpaceId._id === id)[0]?.endDate.split("T")[0] || "")
 

        const [reviews,setReviews] = useState([])



        const getDetails = async ()=>{
                try{    
                    const response = await axios.get(`http://127.0.0.1:3857/api/workSpace/${id}`,{
                        headers: {
                          Authorization:localStorage.getItem('token')
                        }}) 

                        if(response.status===200){
                            // console.log(response.data)
                            setWorkSpace(response.data)
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


      const addReview = (data)=>{
        setReviews([...reviews,data])
      }

        useEffect(()=>{
            getDetails()
            getReviews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
        

        

        useEffect(()=>{
            const req1= axios.get(`http://127.0.0.1:3857/api/spaceType/${id}`,{
                headers: {
                  Authorization:localStorage.getItem('token')
                }})
           
            const req2 = axios.get(`http://127.0.0.1:3857/api/spaces/${id}`,{
                headers: {
                  Authorization:localStorage.getItem('token')
                }})
            axios.all([req1,req2])
                    .then(axios.spread((response1,response2) => {
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

    useEffect(() => {
        const deskPrice = spacetypes.find((ele) => ele.name === "desk")?.price || 0;
        const cabinPrice = spacetypes.find((ele) => ele.name === "cabin")?.price || 0;
        const totalPrice = selectedDesk.length * deskPrice + selectedCabin.length * cabinPrice;
        setTotalPrice(totalPrice);
      }, [selectedDesk, selectedCabin, spacetypes])
 
 


  




    const handleCheckboxChange = async (event, objectId) => {
        const isChecked = event.target.checked;
    
        if (select === 'desk') {
          if (isChecked) {
            if(startDate && endDate){
              await axios.post(
                "http://127.0.0.1:3857/api/add-to-cart", // Update the URL to your backend endpoint for adding to the cart
                {
                  itemId: objectId,
                  name:'desk',
                  price:spacetypes.find((ele)=>ele.name ==="desk")?.price,
                  quantity:1,
                  productId: 9961,
                  workSpaceId:id,
                  startDate,
                  endDate
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              setSelectedDesk([...selectedDesk, objectId])
            }
          } else {
            await axios.post(
              "http://127.0.0.1:3857/api/remove-to-cart", // Update the URL to your backend endpoint for adding to the cart
              {
                itemId: objectId,
                productId: 9961
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            setSelectedDesk(selectedDesk.filter(id => id !== objectId))
          }
        } else if (select === 'cabin') {
          if (isChecked) {
            if(startDate && endDate){
              await axios.post(
                "http://127.0.0.1:3857/api/add-to-cart", // Update the URL to your backend endpoint for adding to the cart
                {
                  itemId: objectId,
                  name:'cabin',
                  price:spacetypes.find((ele)=>ele.name ==="cabin")?.price,
                  quantity:1,
                  productId: 9962,workSpaceId:id,
                  startDate,
                  endDate
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              setSelectedCabin([...selectedCabin, objectId])
            }
          } else {
            await axios.post(
              "http://127.0.0.1:3857/api/remove-to-cart", // Update the URL to your backend endpoint for adding to the cart
              {
                itemId: objectId,
                productId: 9962
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            setSelectedCabin(selectedCabin.filter(id => id !== objectId)) 
          }
        }
      }
      console.log(workSpaceState.cartItems.filter((ele)=>ele.productId === 9961))
     
    

      const deleteReview = (data)=>{
            const result = reviews.filter((ele)=>ele._id !== data._id)

            setReviews(result)
      }

      const updateReview = (data)=>{
        const result = reviews.map((ele)=> ele._id === data._id ? {...data}:{...ele})

        setReviews(result)
      }


      const handleSubmit = (e)=>{
        e.preventDefault()
          navigate('/cart')
      }

      

    return (
        <>
         <div className="row">
            <div className="col-lg-12 my-2 shadow-lg">

                <WorkspaceCarousel workSpace={workSpace} style={{width:"75%",height:"75%"}}  />
  
            </div>
            
         <div className="row my-3 p-2">
         <div className="col-lg-4 p-2  shadow-lg">
                <h6 className="fw-bold my-3 pt-4 text-decoration-underline text-danger">Name</h6>
                <h6 className="fw-bold mx-5">{workSpace.name}</h6>
                <h6 className="fw-bold my-3 pt-3 text-decoration-underline text-danger">Address</h6>
                <h6 className="fw-bold mx-5 ">{workSpace.address?.name}</h6>
                <h6 className="fw-bold my-3 pt-3 text-decoration-underline text-danger">Facilities</h6>
                <h6 className="fw-bold ">{workSpace.facilities&& <IconList  items={workSpace.facilities} /> }</h6>
                <h6 className="fw-bold my-3 pt-3 text-decoration-underline text-danger">Description</h6>
                <h6 className="fw-bold mx-5">{workSpace.description}</h6>
                <h6 className="fw-bold my-3 pt-3"><span className="text-danger text-decoration-underline">Spaces Types</span>  <span className="mx-5 px-1"> desk </span>  <span className="mx-5">  cabins</span></h6>
                <h6 className="fw-bold my-3 pt-3"> <span className="text-danger text-decoration-underline">Prices </span>  <span  className="mx-5 px-5">{localStorage.getItem('token') ? (spacetypes.find((ele)=>ele.name ==="desk")?.price): (2000)}</span> <span className="mx-3">{localStorage.getItem('token') ? (spacetypes.find((ele)=>ele.name ==="cabin")?.price): (4000)}</span></h6>
            </div>
            <div className="col-lg-8 p-2  shadow-lg">
              
            {workSpace.address && <SpaceMap lat={workSpace.address.latitude} lng={workSpace.address.longitude}/>}
            </div>
         </div>
         </div>
            { (localStorage.getItem('token')&& workSpaceState.userDetails.role === 'user')&&<div className="row">
                <form className="mt-5 fw-bold" onSubmit={handleSubmit}>
                    <label className=" mx-2 px-4">
                    <select className="form-select " value={select} onChange={(e)=>{setSelect(e.target.value)}}>
                            <option value=""> Select Space Type</option>
                            <option value="desk"> Desks</option>
                            <option value="cabin"> Cabins</option>
                    </select>
                    </label>
                    <label className="mx-4 px-4"> Start Date  <input className="form-control" type="date" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}}/></label>
                    <label className="mx-4 px-4"> End Date <input className="form-control" type="date" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}/> </label> <span> <span className="mx-2 px-2">Selecteed Desk : {selectedDesk.length}</span> <span className="mx-2 px-2">selectedCabins:{selectedCabin.length}</span> <span className="mx-2 px-2"> totalPrice:{totalPrice}</span></span> <br/>
                        {
                            (select ==="desk") && (<div className="m-4 p-2" >
                            {
                                desks.map((ele,i)=>{
                                    return <input key={i}   disabled={!ele.isAvailable}  checked={selectedDesk.includes(ele._id)}  defaultChecked={!ele.isAvailable} onChange={(e) => handleCheckboxChange(e, ele._id)} type="checkbox" className="m-2 p-2 " style={{ width: '30px', height: '30px', }}/>
                                })
                            }
                        </div>)
                        }
                        {
                            (select ==="cabin") && (<div className="m-4 p-2" >
                            {
                                cabin.map((ele,i)=>{
                                    return <input key={i}  disabled={!ele.isAvailable}  checked={selectedCabin.includes(ele._id)} defaultChecked={!ele.isAvailable} onChange={(e) => handleCheckboxChange(e, ele._id)} type="checkbox" className="m-2 p-2 " style={{ width: '30px', height: '30px', }}/>
                                })
                            }
                        </div>)
                        }     
                    <input type="submit" value="Go To Cart" className="btn btn-success fw-bold m-5" />
                </form>
            </div>}
        {localStorage.getItem('token')? <button className="btn btn-warning m-5 fw-bold"> <Link className="text-decoration-none text-dark" to="/userWorkSpaces"> Back to WorkSpaces </Link> </button>:<button className="btn btn-warning m-5 fw-bold"> <Link className="text-decoration-none text-dark" to="/"> Back to Home </Link> </button>}
         <div className="row">
   
                        <div className="col-lg-12">
                              <ReviewContainer  id={id} addReview = {addReview} del={deleteReview} updateReview={updateReview}  reviews= {reviews}/>  
                        </div>
         </div>
        </>
    )
 }


 function IconList({ items }) {
  const getIconForItem = (item) => {
    switch (item.toLowerCase()) {
      case 'coffee':
        return <FontAwesomeIcon icon={faCoffee} size="2x"  />;
      case 'parking':
        return <FontAwesomeIcon icon={faParking} size="2x"  />;
      case 'wifi':
        return <FontAwesomeIcon icon={faWifi} size="2x"  />;
      case 'security':
        return <FontAwesomeIcon icon={faShield}  size="2x" />;
      default:
        return <FontAwesomeIcon icon={faShield} size="2x"  />;
    }
  };

  return (
    <div className="fw-bold mx-5 d-flex flex-wrap">
      {items.map((item, index) => (
        <p className="mx-2 px-4 my-3" key={index}>
          {getIconForItem(item)} {item}
        </p>
      ))}
    </div>
  );
}

 export default ShowWorkSpace