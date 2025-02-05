import { Link } from "react-router-dom";

export const Login = () => {



  return <>
          <h3>SILENT MOON</h3>
          <img src="./img/landing_page.png" alt="Dude doing yoga stuff" />
      
          <div>
            <h1>We are what we do</h1>
            <p>Thousand of people are using silent moon  
            for meditation and yoga classes.</p>
          </div>

          <Link to="/signup">Sign Up</Link>
          <p>ALREADY HAVE AN ACCOUNT? <Link to="/signin">LOG IN</Link></p>
  </>



};
