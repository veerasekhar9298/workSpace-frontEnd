 

 function BookItem (props){
    const {ele} = props


    return (
        <>
            <div className="col-lg-4 rounded-2 fw-bold bg-success m-2 bg-opacity-25 p-4">
                 <p>Name:{ele.userId.username}</p>
                 <p>startDate:{new Date(ele.startDate).toLocaleDateString()}</p>
                 <p>endDate:{new Date(ele.endDate).toLocaleDateString()}</p>
                 <p>Price :{ele.totalPrice}</p>
                 <button className="btn btn-info mx-2 fw-bold"> Edit </button>
            </div>
        </>
    )
 }

 export default BookItem