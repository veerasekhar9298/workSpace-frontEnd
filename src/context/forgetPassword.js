import { useState } from "react"
import  axios from 'axios'
import { useNavigate } from "react-router-dom";  
import { showAlert,showAlert2 } from "../components/Auth/Login"; 

 function ForgetPassword (props){

        const navigate = useNavigate()

        const [email,setEmail] = useState("")

        const [formErrors,setFormErrors] = useState({})

        const errors = {}

        const runValidations = ()=>{
            if(email.trim().length === 0){
                errors.email = "email is required"
            }else if(!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)){
                    errors.email = "email format not Correct"
            }
          
        } 
       

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
                runValidations()

                if(Object.keys(errors).length ===0){

                    const response = await axios.post(`http://127.0.0.1:3857/api/verfyEmail`,{email})

                if(response.status ===200){
                    showAlert(response.data.msg)
                    navigate('/mobileVerify')

                }
                    setFormErrors({})
                }else{
                    setFormErrors(errors)
                }
                
            }catch(e){
                // console.log(e)
                    showAlert2(e.response.data.msg)

            }
    }



    return (<>  
            <div className="row mt-5 py-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 m-5 p-5 bg-primary bg-opacity-25 rounded-3 shadow-lg">
                        <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                        <label  class=" fw-bold">Email address </label>
                        <input type="email" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} /> <br/>
                         {formErrors.email && <span className="text-danger fw-bold">*{formErrors.email}</span>}
                        </div>
                        <div className="mx-5 pt-4 px-3">
                        <input type="submit" className="btn btn-success fw-bold mx-5"/>
                        </div>
                        </form>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </>)
 }



 export default ForgetPassword