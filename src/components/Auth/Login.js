/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useContext} from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import { workSpaceContext } from "../../App";
import { useNavigate } from "react-router-dom";
import login from "../Payment/login.jpg"
import Swal from 'sweetalert2'



export const getUser = async (workSpacedispatch) => {
    try {
        const response2 = await axios.get("https://sharespace-xwig.onrender.com/api/user/Account", {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        if (response2.status === 200) {
            workSpacedispatch({ type: "USER_DETAILS", payload: response2.data });
        }
    } catch (e) {
        console.log(e);
    }
};

export const showAlert = (msg) => {
    let timerInterval
        Swal.fire({
        title: msg,
        timer: 900,
        timerProgressBar: true,
        icon:'success',
        didOpen: () => {
            Swal.showLoading()
            // const b = Swal.getHtmlContainer().querySelector('b')
            // timerInterval = setInterval(() => {
            // b.textContent = Swal.getTimerLeft()
            // }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        })
  };
export const showAlert2 = (msg) => {
    let timerInterval
        Swal.fire({
        title: msg,
        timer: 900,
        timerProgressBar: true,
        icon:'error',
        didOpen: () => {
            Swal.showLoading()
            // const b = Swal.getHtmlContainer().querySelector('b')
            // timerInterval = setInterval(() => {
            // b.textContent = Swal.getTimerLeft()
            // }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        })
  };









function Login (props){
    const navigate = useNavigate()

        const {workSpacedispatch} = useContext(workSpaceContext)

    const {handlelogin} = props

    const [loginData,setLoginData] = useState({
        email:"",password:""
    })

    const [formErrors,setFormErrors] = useState({})

    const errors = {}

    const runValidations = ()=>{
        if(loginData.email.trim().length ===0){
            errors.email = "email is required"
        }else if(!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(loginData.email)){
                errors.email = "email format not Correct"
        }

        if(loginData.password.trim().length ===0){
            errors.password = "password is required"
        }
    }

    const handleChange = (e)=>{
        setLoginData({
            ...loginData,[e.target.name]:e.target.value
        })
    }

   
    

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            runValidations()
            if(Object.keys(errors).length === 0){
                    console.log('triggering')
                const response = await axios.post("https://sharespace-xwig.onrender.com/api/user/Login",loginData)
                console.log(response)
                if(response.status === 200){
                    showAlert("Login Successfull")
                    localStorage.setItem("token",response.data.token)
                    getUser(workSpacedispatch)
                   handlelogin(true)
                }
                

                setFormErrors({})
            }else{
                setFormErrors(errors)
            }
        }catch(e){
            console.log('errors Came')
            console.log(e)
            showAlert2(e.response.data.errors)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            console.log(jwt_decode(localStorage.getItem('token')))
        }
    },[])


    return (
       <div className="container" style={{minHeight:"700px"}}>
        <div className="row mt-5">
            <div className="col-lg-6 text-center ">
                    <img src={login} alt="login" className="img-fluid" style={{width:"500px"}}/>
            </div>
            <div className="col-lg-6 fw-bold bg-danger bg-opacity-25 mt-5 pt-5 text-center rounded-3 shadow-lg">
                <h2> Login Form</h2>
                    <form onSubmit={handleSubmit}>
                        <label> Email  <input type="text" name="email" className="form-control m-2" value={loginData.email} onChange={handleChange}/></label>  <br/> {formErrors.email && <p className="text-danger">*{formErrors.email}</p>}
                        <label> Password <input type="password" name="password" className="form-control m-2" value={loginData.password} onChange={handleChange}/></label> <br/> {formErrors.password && <p className="text-danger">*{formErrors.password}</p>}
                    <p className="text-center"><a href="#" onClick={()=>{navigate('/forgotPassword')}}>forgot Password ?</a></p>
                        <input type="submit" className="btn btn-primary m-3"/>
                    </form> 
                    <p className="text-center"> Don't Have Account ? <a href="#" onClick={()=>{navigate('/register')}}>Register here</a></p>
            </div>
        </div>
       </div>
    )
}


export default Login;