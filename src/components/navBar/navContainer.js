import { Buildings } from 'react-bootstrap-icons'
import Navigator from './navBar'

 function NavContainer (props){

    return (
        <div className="row">
            <div className="col-lg-3">  
            <Buildings size={60} color="green" />
            <span className='display-6'> Share Space</span>
            </div>
            <div className="col-lg-5 ">
                <Navigator/>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2"></div>
        </div>
    )
 }

 export default NavContainer 