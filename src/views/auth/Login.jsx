
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../../utils/utils';
import { messageClear, seller_login } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';






const Login = () => {

 const navigate = useNavigate()


  const dispatch = useDispatch()

  const {loader, successMessage ,errorMessage} = useSelector(state => state.auth)
 
 
    const [state,seState]=useState({
       
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
         dispatch(seller_login(state))
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
        <div className=" my-7 h-[530px] flex flex-col  bg-green shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="Welcome flex flex-col justify-center p-8 md:p-10">
            <motion.span
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8 text-3xl font-bold text-black"
            >
              Welcome Back
            </motion.span>
            <form onSubmit={submit}>
              
              <div className="py-2 relative">
              <input onChange={inputHandel} value={state.email} name='email'  type="email" id="username" className="  bg-green text-grey-100 w-full border-b py-4 focus:outline-none focus:border-grey-600 focus:border-b-2 transition-colors peer" autoComplete="off"/>
             <label htmlFor="username" className="absolute font-bold left-0  top-1 text-textlight cursor-text peer-focus:text-xs peer-focus:-top-2 peer-focus:text-grey-600 transition-all">Email</label>
              </div>
              <div className="py-2 relative">
              <input onChange={inputHandel} value={state.password}  name='password' type="password" id="password" className="  bg-green text-grey-100 w-full border-b py-4 focus:outline-none focus:border-grey-600 focus:border-b-2 transition-colors peer" autoComplete="off"/>
             <label htmlFor="username" className="absolute font-bold left-0  top-1 text-textlight cursor-text peer-focus:text-xs peer-focus:-top-0 peer-focus:text-grey-600 transition-all">password</label>
              </div>

              <button disabled={loader ? true : false}  className='bg-textdark w-[320px] mt-[25px] hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Login'
            } 
            </button>
              <div className='flex  items-center mb-3 gap-3 justify-center'>
                <p className='text-textlight mr-2'>Don't Have an account ?<Link className='font-bold text-textdark' to="/register">Sign Up</Link></p>
              </div>

              <div className='w-full flex justify-centre items-center mb-3'>
                 <div className='w-[45%] bg-textdark h-[1px]'></div>
                 <div className='w-[10%] flex justify-center items-center'><span className='pb-1 text-textdark'> Or </span></div>
                 <div className='w-[45%] bg-textdark h-[1px]'></div>
              </div>

              <div className='flex justify-center items-center gap-3 py-3'>
                 <div className='w-[135px] h-[35px] flex rounded-md bg-butoncolor  border border-rounded shadow-lg hover:shadow-butoncolor justify-center cursor-pointer items-center overflow-hidden'>
                  <span className='text-red-600'><FaGoogle /></span>
                 </div>

                 <div className='w-[135px] h-[35px] flex rounded-md bg-butoncolor   border border-rounded shadow-lg hover:shadow-butoncolor justify-center cursor-pointer items-center overflow-hidden'>
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

export default Login;
