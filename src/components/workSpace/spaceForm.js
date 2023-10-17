import { useState,useContext } from "react"
import { workSpaceContext } from "../../App"
import axios from "axios"
 

 function SpaceForm (props){

    const {workSpaceState} = useContext(workSpaceContext)

        const {id,getSpacesDetails} = props

        const [spaceData,setSpaceData] = useState({
                name:"",quantity:"",price:"",owner:workSpaceState.userDetails._id,workspace:id
        })


            const handleChange = (e)=>{
                console.log(e.target.value)
                setSpaceData({
                    ...spaceData,[e.target.name]:e.target.value,owner:workSpaceState.userDetails._id
                })
            }
      
            console.log(workSpaceState.userDetails._id) 

            const [formErrors,setFormErrors] = useState({})

            const errors = {}
    
            const runValidations = ()=>{
                if(spaceData.name.trim().length === 0){
                    errors.name = "name is required"
                }
                if(spaceData.quantity.trim().length === 0){
                    errors.quantity = "Quantity is required"
                }
                if(spaceData.price.trim().length === 0){
                    errors.price = "price is required"
                }
              
            } 









            const handleSpaceSubmit = async (e)=>{
                e.preventDefault()
                try{
                    runValidations()
                    if(Object.keys(errors).length ===0){
                        const response = await axios.post(`https://sharespace-xwig.onrender.com/api/spaceType`,{...spaceData,quantity:parseInt(spaceData.quantity),price:parseInt(spaceData.price)},{
                        headers: {
                          Authorization:localStorage.getItem('token')
                        }}) 
                        if(response.status ===200){
                            console.log(response.data)
                            getSpacesDetails(response.data) 
                            setSpaceData({
                                name:"",quantity:"",price:"",owner:workSpaceState.userDetails._id,workspace:id
                        }) 
                        }
                        setFormErrors({})
                    }else{
                        setFormErrors(errors)
                    }
                    

                }catch(e){
                    console.log(e)
                }
            }

            
    return (<form className="fw-bold text-center" onSubmit={handleSpaceSubmit}>
                <label> Space Type  <select value={spaceData.name} onChange={handleChange} name="name" className="form-select m-2">
                                        <option value="" > Choose</option>
                                        <option value="desk" > Desk</option>
                                        <option value="cabin"> Cabin</option>
                                    </select></label><br/>
                         {formErrors.name && <span className="text-danger fw-bold">*{formErrors.name}</span>} <br/>
                <label> Quantity  <input type="Number" name="quantity" value={spaceData.quantity} onChange={handleChange} className="form-control m-2"/></label> <br/>
                         {formErrors.quantity && <span className="text-danger fw-bold">*{formErrors.quantity}</span>}<br/>
                <label> Price  <input type="Number" name="price" value={spaceData.price} onChange={handleChange} className="form-control m-2"/></label><br/>
                         {formErrors.price && <span className="text-danger fw-bold">*{formErrors.price}</span>} <br/>
                <input type="submit" value="Add Space" className="btn btn-success m-2"/>
        </form>)
 }

 export default SpaceForm