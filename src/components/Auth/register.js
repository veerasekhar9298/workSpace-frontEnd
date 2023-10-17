/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import join from '../Payment/join.jpg'
import Swal from 'sweetalert2'

 function Register(props){

    const navigate = useNavigate()

    const [registerData,setRegisterData] = useState({
        firstName :"",lastName:"",email:"",password:"",mobile:"",username:"",type:false
    }) 

    const [formErrors,setFormErrors] = useState({})

        const errors= {}
    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;

        const newValue = type === "checkbox" ? checked : value;
        
        setRegisterData({
          ...registerData,
          [name]: newValue,
        });
    }

    const showAlert = (msg) => {
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

    const runValidations = ()=>{
            if(registerData.firstName.trim().length ===0){
                errors.firstName = "firstName is Required"
            }
            if(registerData.lastName.trim().length ===0){
                errors.lastName = "lastName is requires"
            }

            if(registerData.email.trim().length ===0){
                errors.email = "email is required"
            }else if(!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(registerData.email)){
                    errors.email = "email format not Correct"
            }

            if(registerData.password.trim().length ===0){
                errors.password = "Password is Required"
            }  
            if(registerData.mobile.trim().length ===0){
                errors.mobile = "mobile is Required"
            }

            if(registerData.username.trim().length ===0){
                errors.username = "username is Required"
            } 
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             runValidations()
             if(Object.keys(errors).length ===0){
                console.log(registerData)
                const response = await axios.post(`https://sharespace-xwig.onrender.com/api/usersRegister`, registerData);
                console.log(response.data)
                if(response.status===200){
                    showAlert(response.data.msg)
                        setRegisterData({
                            firstName :"",lastName:"",email:"",password:"",mobile:"",username:"",type:false
                        })
                        navigate('/login')
                }
                setFormErrors({})
             }else{
                setFormErrors(errors)
             }
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container" style={{minHeight:'900px'}}>
            <div className="row  fw-bold">
            <div className="col-lg-6 mt-5 p-2 bg-info bg-opacity-25 rounded-3 shadow-lg">
            <h2 className="text-center m-3 display-6" > Register With Us </h2>
            <form onSubmit={handleSubmit} className="text-center" >
                <label> FirstName <input type="text"  className="form-control m-2" value={registerData.firstName} onChange={handleChange} name="firstName"/></label> <br/>{formErrors.firstName && <span className="text-danger"> * {formErrors.firstName}</span>}<br/> 
                <label> lastName  <input type="text" className="form-control m-2"  value={registerData.lastName} onChange={handleChange} name="lastName"/></label><br/>{formErrors.lastName && <span className="text-danger"> *{formErrors.lastName}</span>} <br/>
                <label> Email  <input type="text"  className="form-control m-2" value={registerData.email} onChange={handleChange} name="email"/></label> <br/>{formErrors.email && <span className="text-danger"> *{formErrors.email}</span>}<br/>
                <label> password  <input type="password" className="form-control m-2"  value={registerData.password} onChange={handleChange} name="password"/></label><br/>{formErrors.password && <span className="text-danger"> *{formErrors.password}</span>} <br/>
                <label> username  <input type="text" className="form-control m-2"  value={registerData.username} onChange={handleChange} name="username"/></label><br/>{formErrors.username && <span className="text-danger"> *{formErrors.username}</span>} <br/>
                <label> Mobile  <input type="text" className="form-control m-2"  value={registerData.mobile} onChange={handleChange} name="mobile"/></label> <br/>{formErrors.mobile && <span className="text-danger"> *{formErrors.mobile}</span>}<br/>
                 <label> <input type="checkbox" name="type" checked={registerData.type} onChange={handleChange} className="from-control m-2"/> Allot Space </label> <br/>
                <input type="Submit" value="Register" className="btn btn-success m-4 fw-bold"/>
            </form>
                <p className="text-center"> Already Have Account ? <a href="#" onClick={()=>{navigate('/login')}}>Login here</a></p>
            </div>
            <div className="col-lg-6 mt-5 pt-5">
                    <img src={join} className="img-fluid" alt="join"/>
                   
            </div>
        </div>
        </div>
    ) 
 }


 export default Register ;