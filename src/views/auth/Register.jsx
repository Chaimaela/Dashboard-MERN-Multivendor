
import { motion } from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../../utils/utils';
import { messageClear, seller_register } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';







const Register = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const {loader, successMessage ,errorMessage} = useSelector(state => state.auth)
 
 const [state,seState]=useState({
  name:"",
  email:"",
  password:""
 })





  const inputHandel = (e) => {
   
    seState({
      ...state,
      [e.target.name]:e.target.value
    })

  };

  const submit =(e) =>{
   e.preventDefault()
   dispatch(seller_register(state))
  }

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      navigate('/')
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
  }
 
  },[successMessage, errorMessage])
 


  return (
    <div className="bg-gray-100 h-full py-8" style={{ backgroundImage: 'url("images/backgroundC.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='flex justify-center items-center'></div>
      <div className="flex items-center justify-center">
        <div className=" my-6 h-[533px] flex flex-col my-3 bg-green shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="Welcome flex flex-col justify-center pt-8 md:p-10">
         
            <form onSubmit={submit}>
              <div className="py-3 relative">
              <input  onChange={inputHandel} value={state.name} type="text" id="username" name="name" className="  bg-green text-grey-100 w-full border-b py-3 focus:outline-none focus:border-grey-600 focus:border-b-2 transition-colors peer" autoComplete="off"/>
             <label htmlFor="username" className="absolute font-bold left-0 top-1 text-textlight cursor-text peer-focus:text-xs peer-focus:-top-1 peer-focus:text-grey-600 transition-all">Username</label>
                  
              </div>
              <div className="py-2 relative">
              <input  onChange={inputHandel} value={state.email} type="text" id="email" name="email" className="  bg-green text-grey-100 w-full border-b py-4 focus:outline-none focus:border-grey-600 focus:border-b-2 transition-colors peer" autoComplete="off"/>
             <label htmlFor="username" className="absolute font-bold left-0  top-1 text-textlight cursor-text peer-focus:text-xs peer-focus:-top-1 peer-focus:text-grey-600 transition-all">Email</label>
              </div>
              <div className="py-2 relative">
              <input  onChange={inputHandel} value={state.password}  type="password" id="password" name="password" className="  bg-green text-grey-100 w-full border-b py-4 focus:outline-none focus:border-grey-600 focus:border-b-2 transition-colors peer" autoComplete="off"/>
             <label htmlFor="username" className="absolute font-bold left-0  top-1 text-textlight cursor-text peer-focus:text-xs peer-focus:-top-1 peer-focus:text-grey-600 transition-all">password</label>
              </div>
              <div className="flex justify-between w-full py-2">
                <div className="my-3">
                  <input className=" mr-2 " type="checkbox" name="ch" id="ch"  />
                  <span className=" bg-green p-2 rounded text-sm text-textlight ">i agree to private policy & treams</span>
                </div>
               
              </div>
              <button disabled={loader ? true : false}  className='bg-textdark w-[320px] mt-[25px] hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Sign Up'
            } 
            </button>
              <div className='flex  items-center mb-3 gap-3 justify-center'>
                <p className='text-textlight mr-2'>Already Have an account ?<Link className='font-bold text-textdark' to="/login">Sign In</Link></p>
              </div>

              <div className='w-full flex justify-centre items-center mb-3'>
                 <div className='w-[45%] bg-textdark h-[1px]'></div>
                 <div className='w-[10%] flex justify-center items-center'><span className='pb-1 text-textdark'> Or </span></div>
                 <div className='w-[45%] bg-textdark h-[1px]'></div>
              </div>

              <div className='flex justify-center items-center gap-3'>
                 <div className='w-[135px] h-[35px] flex rounded-md bg-butoncolor mb-3 border border-rounded shadow-lg hover:shadow-butoncolor justify-center cursor-pointer items-center overflow-hidden'>
                  <span className='text-red-600'><FaGoogle /></span>
                 </div>

                 <div className='w-[135px] h-[35px] flex rounded-md bg-butoncolor  mb-3 border border-rounded shadow-lg hover:shadow-butoncolor justify-center cursor-pointer items-center overflow-hidden'>
                  <span className='text-blue-600'><FaFacebook /></span>
                 </div>
              </div>

             
            </form>
          </div>
          <div className="relative">
            <img
              src="images/stickerfinalJPG.jpg"
              alt="img"
              className=" w-[320px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
