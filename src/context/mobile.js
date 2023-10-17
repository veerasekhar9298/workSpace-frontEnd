import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showAlert,showAlert2 } from '../components/Auth/Login'
 


 function MobileVerify (props){

    const navigate = useNavigate ()


    const [number,setNumber] = useState('')

    const [otp,setOtp] = useState('')


    const [sent,setSent] = useState(false)


    const [formErrors,setFormErrors] = useState({})

        const errors = {}

        const runValidations = ()=>{
            if(number.trim().length === 0){
                errors.number = "number is required"
            }else if(number.length !== 10){
                errors.number = "number should valid"
            }
          
        }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        try{
            runValidations()
            if(Object.keys(errors).length ===0){
                const response = await axios.post(`http://127.0.0.1:3857/api/verfyMobile`,{number:'+91'+number})

                        if(response.status ===200){
                            showAlert(response.data.msg)
                                // navigate('/setPassword')
                            setSent(true)
                        }
                setFormErrors({})
            }else{
                setFormErrors(errors)
            }
            
        }catch(e){
            console.log(e)
            showAlert2(e.response.data.msg)
        }

    }


    const handleVerify = async (e)=>{
        e.preventDefault()

        try{
            runValidations()
            if(Object.keys(errors).length ===0){
                const response = await axios.post(`http://127.0.0.1:3857/api/verfyOtp`,{otp:parseInt(otp)})

                    if(response.status ===200){
                        showAlert(response.data.msg)
                        setSent(false)
                        navigate('/setPassword')
                    }

                setFormErrors({})
            }else{
                setFormErrors(errors)
            }
            
        }catch(e){
                showAlert2(e.response.data.msg)
                console.log(e)

        }
    }


    return (<>
            <div className="row mt-5 py-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 m-5 p-5 bg-primary bg-opacity-25 rounded-3 shadow-lg">
                       {!sent ? ( <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label fw-bold">Moblie number</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={number} onChange={(e)=>{setNumber(e.target.value)}} /><br/>
                        {formErrors.number && <span className="text-danger fw-bold">*{formErrors.number}</span>}
                        </div>
                        <div className="mx-5 pt-4 px-3">
                        <input type="submit" className="btn btn-success fw-bold mx-5"/>
                        </div>
                        </form>):(<form onSubmit={handleVerify}>
                        <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label fw-bold">Enter Otp</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={otp} onChange={(e)=>{setOtp(e.target.value)}} />
                        </div>
                        <div className="mx-5 pt-4 px-3">
                        <input type="submit" className="btn btn-success fw-bold mx-5"/>
                        </div>
                        </form>)

                       }
                </div>
                <div className="col-lg-4"></div>
            </div>


            </>)
 }


 export default MobileVerify