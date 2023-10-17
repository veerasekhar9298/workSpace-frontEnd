import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { workSpaceContext } from "../../App";
import cabin from '../Payment/babin.jpeg'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import empty from"../Payment/empty.webp"
export const getCartItems = async (workSpacedispatch) => {
  try {
    const response = await axios.get("http://127.0.0.1:3857/api/all-cart-Items", {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      workSpacedispatch({ type: "CART_ITEMS", payload: response.data });
    }
  } catch (e) {
    console.log(e);
  }
};

function Cart(props) {


  const { workSpacedispatch, workSpaceState } = useContext(workSpaceContext);

    
 const fee = 0

  useEffect(() => {
    getCartItems(workSpacedispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveItem = async(id)=>{
    try{
        const response = await axios.delete(`http://127.0.0.1:3857/api/remove-cart-Item/${id}`,{
          headers:{
            Authorization: localStorage.getItem('token')
          }
        })

        if(response.status === 200){
            console.log(response.data)
                workSpacedispatch({type:"REMOVE_CART_ITEM",payload:response.data._id})
        }



    }catch(e){

      console.log(e)


    }
  }




  const handleSubmit = async (e)=>{
    
    try{
        e.preventDefault()
          console.log(workSpaceState.cartItems.reduce((total, item) => total + item.price * item.quantity, 50))
            
        const response = await axios.post('http://127.0.0.1:3857/api/create-checkout-session', {
            items:workSpaceState.cartItems,totalPrice:workSpaceState.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
          }, {
            headers: {
              Authorization:localStorage.getItem('token')
            }});
      
          if(response.status ===200){
                console.log(response.data,'checkout-session')
                   await axios.delete(`http://127.0.0.1:3857/api/clear-cart-Items`,{
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  })
                const data = {userId:workSpaceState.userDetails._id,totalPrice:workSpaceState.cartItems.reduce((total, item) => total + item.price, 0),items:workSpaceState.cartItems}

                const response2 = await axios.post(`http://127.0.0.1:3857/api/bookings`,data,{
                    headers: {
                      Authorization:localStorage.getItem('token')
                    }}) 
                    if(response2.status ===200){
                        console.log(response2.data,'booking data')
                           localStorage.setItem('booking',response2.data.map((ele)=>ele._id))
                           const { id ,url } = response.data;
                           
                           localStorage.setItem('transaction',id)
                         window.location = url;
                    }
                 
          }
    }catch(e){
        console.log(e)
    }   
}

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      {workSpaceState.cartItems.length >0 ?<MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                          WorkSpace Booking
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {workSpaceState.cartItems.length} items
                        </MDBTypography>
                      </div>

                      <hr className="my-4" />

                      {workSpaceState.cartItems.map((cartItem, index) => (


                        <div key={index} className="mb-4 d-flex justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src={cabin}
                              fluid className="rounded-3" alt={cartItem.name} />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">
                              {cartItem.workSpaceId.name}
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              {cartItem.name}
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0 mt-2">
                              {new Date(cartItem.startDate).toLocaleDateString()} 
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0 mt-2">
                              {new Date(cartItem.endDate).toLocaleDateString()} 
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput type="number" min="0" defaultValue={cartItem.quantity} size="sm" />

                            <MDBBtn color="link" className="px-2">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">
                            &#x20B9;  {cartItem.price }
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <button className="btn-outline-danger btn" onClick={()=>{handleRemoveItem(cartItem._id)}}>
                              X
                            </button>
                          </MDBCol>
                        </div>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="#!" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2"  /> <Link to="/userWorkSpaces">Back to Workspaces</Link>
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Items {workSpaceState.cartItems.length}
                        </MDBTypography>
                        <MDBTypography tag="h5">
                        &#x20B9; {workSpaceState.cartItems.reduce((total, item) => total + item.price , 0)}/-
                        </MDBTypography>
                      </div>
                      {/* <hr className="my-4" /> */}
                      {/* <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Booking Charges
                        </MDBTypography>
                        <MDBTypography tag="h5">
                        &#x20B9; {fee} /-
                        </MDBTypography>
                      </div> */}



                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">
                        &#x20B9; {workSpaceState.cartItems.reduce((total, item) => total + item.price , 0)+ fee}/-
                        </MDBTypography>
                      </div>
                      <button className="btn btn-dark fw-bold" onClick={handleSubmit}> Checkout</button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>: <img src={empty} className="mx-auto d-block text-center" alt="empty" />}
    </section>
  );
}

export default Cart
