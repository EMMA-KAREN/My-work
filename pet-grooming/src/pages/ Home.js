import React from 'react';
import { Link } from 'react-router-dom';
import home_image from '../Image/pet.jpg'
import home_image1 from '../Image/Free_Vector___Businessman_morning_day_schedule_notebook-removebg-preview.png'


const Home = () => {
  return (
    <div className="home">
      <div className="jumbotron text-center">
        <h1>Welcome to Pet Grooming App</h1>
        <p>Your one-stop solution for pet grooming needs!</p>
        
    
      <div className='container' style={{justifyContent:"center",textAlign:"center", backgroundColor:'cream', width:'90vw',margin:"auto", display:"flex"}}>
      <div style={{backgroundImage:`url(${home_image})`,filterbrightness:"50%" ,minHeight:"1700px", width:"50vw", backgroundSize:"cover",backgroundColor:"green", backgroundRepeat:"no-repeat", padding:"10px",justifyContent:"center",textAlign:"center",display:"flex"}}>
          <Link to={'/about'} id='button' style={{backgroundColor:"gray", borderRadius:"100%", width:"400px",height:"400px", marginTop:"400px", boxShadow:'inherit'}}>
              <img src={`${home_image1}`} style={{width:"100%"}} alt=''></img>
              <span style={{fontFamily:"fantasy"}}>LEARN MORE</span>
          </Link>
      </div>
  </div>
  </div>
  </div>
)

}

export default Home;
