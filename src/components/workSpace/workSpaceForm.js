  
import {  useState,useContext, useEffect, } from 'react'
import owner from "../Payment/fun-3d-cartoon-illustration-indian-businessman.jpg"
import owner2 from '../Payment/editForm.jpg'
import { FilePond,  registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import axios from 'axios'
import { workSpaceContext } from '../../App'
import { showAlert, showAlert2 } from '../Auth/Login'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)




  function WorkSpaceForm (props){

      const {isEdit,selectedSpace} = props

    const {workSpaceState,workSpacedispatch} = useContext(workSpaceContext)
    
      const [workSpaceData,setworkSpaceData] = useState({
          name:"",description:"",address:"" , facilities:"",owner: workSpaceState.userDetails._id,files:[]
      })

    const [files, setFiles] = useState([])

      
          



      const handleChange = (e)=>{
              setworkSpaceData({
                ...workSpaceData,[e.target.name]:e.target.value
              })
      }


      const handleFileUpdate = (files) => {
        console.log(files)
        setFiles(files);
      
        setworkSpaceData({
          ...workSpaceData,
          files: files.map((file) => file.file),
        });

      };
      
      const resetForm = () => {
        setworkSpaceData({
          name: "",
          description: "",
          address: "",
          facilities: "",
          owner: "",
          files: [],
        });
      
      
        setFiles([]);
      };

      const [formErrors,setFormErrors] = useState({})

        const errors = {}

        const runValidations = ()=>{
            if(workSpaceData.name.trim().length ===0){
                errors.name = "workSpace name should be provided"
            }

            if(workSpaceData.address.trim().length ===0){
              errors.address = "workSpace address should be Provided"
            }
          

            if(workSpaceData.description.trim().length ===0){
              errors.description = "workSpace description should be Provided"
            }

            if(workSpaceData.facilities.trim().length ===0){
              errors.facilities = "workSpace facilities must be provided"
            }
            
              if(!isEdit){
                if(workSpaceData.files.length ===0){
                  errors.images = "workSpace images must be provided"
                }
              }
            
            

        } 
      

          console.log("selected workSpace in edit form",selectedSpace)


      const handleSubmit = async (e) => {
        e.preventDefault();
         
        const formData = new FormData();
       
        formData.append('name', workSpaceData.name);
        formData.append('description', workSpaceData.description);
        formData.append('address', workSpaceData.address);
        formData.append('owner', workSpaceData.owner);
        formData.append('facilities', workSpaceData.facilities.trim().split(" "));
       
        workSpaceData.files.forEach((file) => {
          formData.append(`files`, file);
        });
        
        try {
          runValidations()

          if(Object.keys(errors).length ===0){

            const response = await axios.post('https://sharespace-xwig.onrender.com/api/workSpace', formData, {
              headers: {
                'Content-Type': 'multipart/form-data', 
                Authorization: localStorage.getItem('token')
              },
            });
              if(response.status ===200){
                  workSpacedispatch({type:"OWNER_SPACES_ADD",payload:response.data})
                  showAlert('WorkSpace Added successfully')
                 resetForm()
              }


            setFormErrors({})
          }else{
            setFormErrors(errors)
          }
          
          
        } catch (error) {
          showAlert2("Error in adding the workSpace")

          console.error('Error uploading data:', error);


        }
      };



      const handleEdit = async(e)=>{
        e.preventDefault();
        console.log('handleEdit function called');
        console.log('workSpaceData:', workSpaceData);
        console.log('selectedSpace:', selectedSpace);
         
        const formData = new FormData();
       
        formData.append('name', workSpaceData.name);
        formData.append('description', workSpaceData.description);
        formData.append('address', workSpaceData.address);
        formData.append('owner', workSpaceData.owner);
        formData.append('facilities', workSpaceData.facilities.trim().split(" "));
       
        if (workSpaceData.files.length > 0) {
          workSpaceData.files.forEach((file) => {
            formData.append(`files`, file);
          });
        }
       
       
        
        try {
          runValidations()

          if(Object.keys(errors).length ===0){
              console.log('edit triggering request',formData)
            const response = await axios.put(`https://sharespace-xwig.onrender.com/api/workSpace/${selectedSpace._id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data', 
                Authorization: localStorage.getItem('token')
              },
            });
              if(response.status ===200){
                  workSpacedispatch({type:"OWNER_SPACES_UPDATE",payload:response.data})
                  showAlert('WorkSpace Updated successfully')
                 resetForm()
              }
              console.log('form update Data',workSpaceData)

            setFormErrors({})
          }else{
            setFormErrors(errors)
          }
          
          
        } catch (error) {
          showAlert2("Error in adding the workSpace")

          console.error('Error uploading data:', error);


        }
      }
     


      useEffect(()=>{
          if(isEdit){
            setworkSpaceData({
              name: selectedSpace.name,
              description: selectedSpace.description,
              address: selectedSpace.address.name,
              facilities: selectedSpace.facilities.join(','),
              owner: selectedSpace.owner,
              files:[]
            })

           

          }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[isEdit,files])
 


    return(
        <div className="row m-4">
            <div className="col-lg-6 fw-bold bg-success bg-opacity-25 rounded-5 shadow-lg p-5">
                {isEdit? <h3 className='display-5 p-2 text-danger text-center my-3'> Edit  Your WorkSpace</h3>:<h3 className='display-5 p-2 text-danger text-center my-3'> Add  Your WorkSpace</h3>}
                <form onSubmit={isEdit ? handleEdit :handleSubmit}>
                <label> <span className='p-2'>Images</span> </label><FilePond
                  files={files}
                  onupdatefiles={handleFileUpdate}
                  allowMultiple={true}
                  maxFiles={4}
                  name="files" 
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                /> <br/>
                {formErrors.images && <span className="text-danger fw-bold">*{formErrors.images}</span>}<br/>
                    <label> <span className='p-2'>WorkSpace name</span>  <input type="text" name="name" className='form-control m-2'  value ={workSpaceData.name} onChange={handleChange}/></label> <br/>
                         {formErrors.name && <span className="text-danger fw-bold">*{formErrors.name}</span>} <br/>
                   <label> <span className='p-2'>description</span>   <textarea name="description" className='form-control m-2' value={workSpaceData.description} onChange={handleChange}></textarea></label> <br/>
                         {formErrors.description && <span className="text-danger fw-bold">*{formErrors.description}</span>} <br/>
                   <label> <span className='p-2'>Address </span>  <textarea name="address" className='form-control m-2' value={workSpaceData.address} onChange={handleChange}></textarea></label> <br/>
                         {formErrors.address && <span className="text-danger fw-bold">*{formErrors.address}</span>} <br/>
                  
              <label> facilities : <input type="text" value={workSpaceData.facilities} name="facilities" onChange={handleChange} className='form-control'/></label><br/>
                         {formErrors.facilities && <span className="text-danger fw-bold">*{formErrors.facilities}</span>} <br/>
                  {isEdit ?<input type="submit" className='btn btn-danger mt-4 mx-4' value="Update"/> : <input type="submit" className='btn btn-warning mt-4 mx-4'/>}
                </form>
            </div>
            <div className="col-lg-6 text-center ">
                   {isEdit?<h1 className='display-5 m-5 pt-5 text-primary text-center'>
                      Customize the WorkSpace
                    </h1>: <h1 className='display-5 m-5 pt-5 text-primary text-center'>
                      Become Business Owner With Us
                    </h1>}
                    <img  src={ isEdit? owner2 :owner} alt="owner" className='img-fluid' style={{height:"350px"}}/>
            </div>
        </div>
    )
  }

  export default WorkSpaceForm; 