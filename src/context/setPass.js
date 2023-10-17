import { useState } from "react"
import axios from 'axios'
 import { useNavigate } from "react-router-dom"
import { showAlert, showAlert2 } from "../components/Auth/Login"


 function ResetPassword (props){

        const navigate = useNavigate()
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirm,setConfirm] = useState('')

    const [formErrors,setFormErrors] = useState({})

        const errors = {}

        const runValidations = ()=>{
            if(email.trim().length === 0){
                errors.email = "email is required"
            }else if(!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)){
                    errors.email = "email format not Correct"
            }


            if(password.trim().length ===0){
                errors.password = "password must pe provided"
            }else if(password !== confirm){
                
                errors.password = "password doesn't matches"
            }
             if(confirm.trim().length ===0){
                
                errors.confirm= " confirm password must be provided"
            }
          
        } 



    const handleSubmit = async (e)=>{
                e.preventDefault()
        try{
            runValidations()
                if(Object.keys(errors).length ===0){
                    setFormErrors({})
                    if(password === confirm){
                        const response = await axios.post(`http://127.0.0.1:3857/api/editPassword`,{email,password})
    
                            if(response.status === 200){
                                console.log(response.data)
                                showAlert(response.data.msg)
                                navigate('/login')
                            }
                    }
                }else{
                    setFormErrors(errors)
                }
                
        }catch(e){
                showAlert2(e.response.data.msg)
            console.log(e)


        }
    }



    return <>
             <div className="row mt-5 py-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 m-5 p-5 bg-success bg-opacity-25 rounded-3 shadow-lg">
                        <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label fw-bold">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="your@mail.com"/><br/>
                         {formErrors.email && <span className="text-danger fw-bold">*{formErrors.email}</span>}
                        </div>
                        <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label fw-bold">password</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
                         {formErrors.password && <span className="text-danger fw-bold">*{formErrors.password}</span>}
                        </div>
                        <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label fw-bold">confirm Password</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}} /><br/>
                         {formErrors.confirm && <span className="text-danger fw-bold">*{formErrors.confirm}</span>}
                        </div>
                        <div className="mx-5 pt-4 px-3">
                        <input type="submit" className="btn btn-success fw-bold mx-5"/>
                        </div>
                        </form>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </>
 }



 export default ResetPassword