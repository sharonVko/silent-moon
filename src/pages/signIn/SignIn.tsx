import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { useUserContext } from "../../context/UserProvider";
// import { SignUp } from "../signUp/SignUp";

export default function SignIn(){
  const navigate = useNavigate()

  const {logInSystem, user} = useUserContext()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value || ""
    const password = passwordRef.current?.value || ""

    try{
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      navigate("/home")
      const { data: dataSession, error: errorSession } = await supabase.auth.getSession();
      console.log(errorSession);
      

      logInSystem(dataSession.session?.user);
      console.log(data, error, user);
    }
    catch (error){
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="text-center sans-pro-900 f-s-36 dark-green mb-20 mt-24">Welcome Back!</h1>

      <form className="flex flex-col items-center" onSubmit={handleSignIn}>
        <input className="input f-s-16 text-center mt-1.5 mb-1.5 uppercase" type="text" name="email" placeholder="E-mail" ref={emailRef} />
        <input className="input f-s-16 text-center mt-1.5 mb-1.5 uppercase" type="text" name="password" placeholder="Password" ref={passwordRef} />
        <button className="btn-pink mt-1.5">Login</button>
      </form>
      <p>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
    </>
  )
}