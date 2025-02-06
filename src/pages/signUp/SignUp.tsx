import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { Backbutton } from "../../components/backButton/Backbutton";
import { mainContext } from "../../context/UserProvider";
import { IUser } from "../../interfaces/IUser";


export default function SignUp() {
  const navigate = useNavigate()

  const {user, setUser} = useContext(mainContext) as {user: IUser, setUser: (user:IUser) => void}

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const surnameRef = useRef<HTMLInputElement>(null)

  // evntl geht das weg - up to you guys
  const repeatPasswordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const email = emailRef.current?.value || ""
    const password = passwordRef.current?.value || ""
    const name = nameRef.current?.value || ""
    const surname = surnameRef.current?.value || ""

    const repeatPassword = repeatPasswordRef.current?.value || ""

    if(password !== repeatPassword) {
      setError("Passwords do not match!")
      return;
    }

    if(user){
      setUser({...user, email: email, password: password, name: name, surname: surname})
    }
    console.log(user);

    try{
      const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options:{
          data: {
            first_name: name || "",
            last_name: surname || ""
          }
        }
      })
      navigate("/welcome")
      console.log(data);
      console.log(error);
    } catch (error){
      console.error(error);
      
    }
  }

  return (
    <>
      <Backbutton/>
      <h1 className="text-center sans-pro-900 f-s-36 dark-green mb-20 mt-32">Create your account </h1>
      <form className="flex flex-col items-center" onSubmit={handleSignUp}>
        <input className="input-sign f-s-16 text-center mt-1.5 mb-1.5 " type="text" name="name" placeholder="Name" ref={nameRef} required />
        <input className="input-sign f-s-16 text-center mt-1.5 mb-1.5 " type="text" name="surname" placeholder="Surname" ref={surnameRef} required />
        <input className="input-sign f-s-16 text-center mt-1.5 mb-1.5 " type="text" name="email" placeholder="Email" ref={emailRef} required />
        <input className="input-sign f-s-16 text-center mt-1.5 mb-1.5 " type="password" name="password" placeholder="Password" ref={passwordRef} required />
        <input className="input-sign f-s-16 text-center mt-1.5 mb-1.5 " type="password" name="repeatPassword" placeholder="Repeat Password" ref={repeatPasswordRef} required />
        <button className="btn-pink mt-1.5">REGISTER</button>
        {error && <p>{error}</p>}
      </form>
      <p className="text-center p-5 mt-2 sans-pro-600 grey f-s-16 uppercase">Already have an account? <Link className="pink" to="/signin">Log In</Link></p>
    </>
  )
  
}
