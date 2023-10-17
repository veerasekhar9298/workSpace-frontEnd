import ReviewItem from "../Review/reviewItem"


function ReviewWorkSpace (props){

        const {reviews} = props
    

   

    return(
        <>
            <h5 className="display-5 text-center"> Reviews </h5>
            {reviews?.map((ele,i)=>{
                return <ReviewItem {...ele} key={i}/>
            })}
        </>
    )
}

export default ReviewWorkSpace