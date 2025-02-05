import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mainContext } from "../../context/UserProvider";
import { IUser } from "../../interfaces/IUser";
import supabase from "../../utils/supabase";

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
            name: name || "",
            surname: surname || ""
          }
        }
      })
      navigate("/home")
      console.log(data);
      console.log(error);
    } catch (error){
      console.error(error);
      
    }
  }

  return (
    <>
      <form onSubmit={handleSignUp}>
        <input type="text" name="name" placeholder="Name" ref={nameRef} required />
        <input type="text" name="surname" placeholder="Surname" ref={surnameRef} required />
        <input type="text" name="email" placeholder="Email" ref={emailRef} required />
        <input type="password" name="password" placeholder="Password" ref={passwordRef} required />
        <input type="password" name="repeatPassword" placeholder="Repeat Password" ref={repeatPasswordRef} required />
        <button>Register</button>
        {error && <p>{error}</p>}
      </form>
      <p>Already have an account? <Link to="/signin">Log In</Link></p>
    </>
  )
  
}
