

import  { useState } from "react";
import {  Link, json, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AuthCard({ title, children, footer }) {
  return (
    <div className="max-w-md w-full bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-6 text-sm text-center text-gray-600">{footer}</div>}
    </div>
  );
}

function Input({ label, id, type = "text", value, onChange, placeholder, autoFocus=false }:any) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </label>
  );
}

function useFakeAuth() {
  // Simple fake auth hooks (replace with real API calls)
  const [user, setUser] = useState(null);

  const signIn = async ({ email, password }) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate latency
    if (email === "demo@eclat.dev" && password === "password") {
      const u = { email, name: "Demo User" };
      setUser(u);
      return { ok: true, user: u };
    }
    if (email.includes("@")) return { ok: false, message: "Invalid credentials" };
    return { ok: false, message: "Invalid email" };
  };

  const register = async ({ name, email, password }) => {
    await new Promise((r) => setTimeout(r, 700));
    if (!email.includes("@")) return { ok: false, message: "Please provide a valid email." };
    const u = { email, name };
    setUser(u);
    return { ok: true, user: u };
  };

  const signOut = () => setUser(null);

  const requestPasswordReset = async (email) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!email.includes("@")) return { ok: false, message: "Unknown email" };
    return { ok: true };
  };

  return { user, signIn, signOut, register, requestPasswordReset };
}

export default function LoginPage() {
  
const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
const handleSignin=()=>{
   
    if(username == ""){
        alert("Pls enter username")
        return 
    }
    if(password == ""){
        alert("Pls enter password")
        return 
    }
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "username": username,
      "password": password
    });
    
    const requestOptions:any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://www.api.eclatreach.com/api/admin", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if(res['status']){
            const userid=res['userid'];
            console.log(userid);
            localStorage.setItem("userid",userid);
            nav("/")
            window.location.reload();
            alert(res['message'])
            setPassword("");
            setUsername("");
        } 
        else{
            alert(res['message'])
        }
        
    
       
        
    })
      .catch((error) => console.error(error));
}
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div className="hidden md:flex flex-col items-start gap-6 px-8">
          <h1 className="text-4xl font-extrabold">Welcome Eclat</h1>
          <p className="text-gray-600">Sign in to continue to your account and access exclusive features.</p>
          
        </div>

        <div className="flex justify-center">
          <AuthCard
            title="Sign in"
            footer={<>
              
            </>}
          >
            <form  className="space-y-4">
             
              <Input label="Username" id="email" type="email" value={username} onChange={(e:any)=>setUsername(e.target.value)} autoFocus />
              <Input label="Password" id="password" type="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} />

             
            </form>

            <div className="mt-4">
              <button disabled={loading} className="w-full border rounded-md py-2" onClick={handleSignin}>
                
                {loading ? 'Login...' : 'Sign In'}
                </button>
            </div>
          </AuthCard>
        </div>
      </motion.div>
    </div>
  );
}
