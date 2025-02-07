import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { Backbutton } from "../../components/backButton/Backbutton";
import { useUserContext } from "../../context/UserProvider";

export default function SignIn() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  const {setUser} = useUserContext()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg("")

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const result = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if(result.data.user) {
      setUser(result.data.user)
      navigate("/welcome")
    } else {
      setErrorMsg(result.error?.message)
    }
  }

  // const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setErrorMsg(null); // Reset error on new attempt

  //   const email = emailRef.current?.value || "";
  //   const password = passwordRef.current?.value || "";

  //   try {
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: email,
  //       password: password
  //     });

  //     if (error) {
  //       setErrorMsg(error.message);
  //       return;
  //     }

  //     navigate("/welcome");

  //     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  //     if (sessionError) console.error("Session fetch error:", sessionError);
  //     else console.log("Session data:", sessionData);

  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     setErrorMsg("An unexpected error occurred. Please try again.");
  //   }
  // }

  return (
    <>
      <Backbutton/>
      <h1 className="text-center sans-pro-900 f-s-36 dark-green mb-20 mt-32">Welcome Back!</h1>

      <form className="flex flex-col items-center" onSubmit={handleSignIn}>
        <input className="input-sign f-s-16 text-center mt-1.5 mb-1.5 " type="text" name="email" placeholder="E-MAIL" ref={emailRef} />
        <input className="input-sign f-s-16 text-center mt-1.5 mb-1.5 " type="password" name="password" placeholder="PASSWORD" ref={passwordRef} />
        <button className="btn-pink mt-1.5">LOGIN</button>
        {errorMsg}
      </form>
      <p className="text-center p-5 mt-2 sans-pro-600 grey f-s-16 uppercase">Don't have an account yet? <Link className="pink" to="/signup">Sign Up</Link></p>
    </>
  )
}