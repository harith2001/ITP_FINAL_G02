import React,{useState} from 'react'
import { useParams,useNavigate,NavLink} from 'react-router-dom';
import axios from "axios";
const Navbar = () => {
    const navigate=useNavigate();
  

      
    return (
       
      
           <nav className="navbar  navbar-expand-lg fixed-top ">
    <div className="container-fluid">
    <h5 class="">Distribution Management</h5>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                    <NavLink className="nav-link  " aria-current="page" exact to="/" >Home</NavLink>
                </li>
                <li className="nav-item ">
                    <NavLink className="nav-link " exact to="/add" activeClassName="active">Add distributor</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link " exact to="/edit" activeClassName="active">Edit Distributor</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link  " exact to="/view" activeClassName="active">View details</NavLink>
                </li>
            </ul>
           
        </div>
    </div>
</nav>
           
           
   
		
       

	
	

  
   
 
          
     
    )
}

export default Navbar