
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";

export const Login = () => {



  return <>
          <div className="">
            <img className="" src="./img/landing_page.png" alt="Dude doing yoga stuff" />
            {/* <h3 className="absolute inset-x-0 top-1  z-1 text-center">SILENT MOON</h3> */}
            <Header/>
          </div>
      
          <div className="mt-10 mb-10 text-center">
            <h1 className="p-2 sans-pro-900 f-s-36 dark-green">We are what we do</h1>
            <p className="sans-pro-600 f-s-16 grey p-2">Thousand of people are using silent moon  
            for meditation and yoga classes.</p>
          </div>

          <div className="text-center p-5 ">
            <Link to="/signup"><button className="btn-pink">Sign Up</button></Link>
            <p className="mt-2 sans-pro-600 grey f-s-16 ">ALREADY HAVE AN ACCOUNT? <Link className="pink" to="/signin">LOG IN</Link></p>
          </div>
  </>



};
