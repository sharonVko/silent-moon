import { Link } from "react-router-dom";

export const Login = () => {



  return <>
          <div className="">
            <img className="" src="./img/landing_page.png" alt="Dude doing yoga stuff" />
            <h3 className="absolute inset-x-0 top-1  z-1 text-center">SILENT MOON</h3>
          </div>
      
          <div className="mt-10 mb-10 text-center">
            <h1 className="p-5">We are what we do</h1>
            <p>Thousand of people are using silent moon  
            for meditation and yoga classes.</p>
          </div>

          <div className="text-center p-5 ">
            <Link to="/signup"><button className="">Sign Up</button></Link>
            <p className="mt-2 brand-blue">ALREADY HAVE AN ACCOUNT? <Link to="/signin">LOG IN</Link></p>
          </div>
  </>



};
