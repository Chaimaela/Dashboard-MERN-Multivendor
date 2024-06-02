import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { admin_login,messageClear } from '../../store/Reducers/authReducer';
import {useNavigate} from 'react-router-dom';


import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const Adminlogin = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {loader,errorMessage,successMessage} = useSelector(state=>state.auth)

  const [state, setState] = useState({ 
      email: "",
      password: ""
  })

  const inputHandle = (e) => {
      setState({
          ...state,
          [e.target.name] : e.target.value
      })
  }

  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
    setState({ ...state, email: '', password: '' }); // Reset the input fields after form submission
    setTimeout(() => {
      setState({ ...state, loader: false }); // Hide the loader after a short delay
    }, 500); // Adjust the delay time as needed
  };

  const overrideStyle = {
    display : 'flex',
    margin : '0 auto',
    height: '20px',
    justifyContent : 'center',
    alignItems : 'center',
    gap:'10px',
    padding:"5px"
  }

  useEffect(() => {
      if (errorMessage) {
          toast.error(errorMessage)
          dispatch(messageClear())
      }
      if(successMessage){
        toast.success(successMessage)
        dispatch(messageClear())
        navigate('/')
      }
  },[errorMessage,successMessage])



  return (
    <div className="bg-gray-100 h-[800px] py-8 " style={{ backgroundImage: 'url("../images/backgroundC.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='flex justify-center items-center'></div>
      <div className="flex items-center justify-center">
        <div className=" my-6  h-[530px] flex flex-col  bg-green shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="  flex flex-col justify-center py-8 md:p-10">
            <motion.span
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-3xl font-bold text-black"
            >
              <img className=" my-[35px]  mx-auto w-[100px] h-[100px]" src="../images/logonaPNG.png" alt="logo" />
            </motion.span>
            <form onSubmit={submit}>

              <div className="py-2 relative ">
                <input
                  onChange={inputHandle}
                  value={state.email}
                  name='email'
                  type="email"
                  id="email"
                  className="bg-green text-grey-100 w-full border-b py-4 pl-3 focus:outline-none focus:border-grey-600 focus:border-b-2 transition-colors peer"
                  autoComplete="off"
                />
                <label htmlFor="email" className="absolute font-bold left-3 top-1 text-textlight cursor-text peer-focus:text-xs peer-focus:-top-2 peer-focus:text-grey-600 transition-all">Email</label>
              </div>
              <div className="py-2 relative">
                <input
                  onChange={inputHandle}
                  value={state.password}
                  name='password'
                  type="password"
                  id="password"
                  className="bg-green text-grey-100 w-full border-b py-4 pl-3 focus:outline-none focus:border-grey-600 focus:border-b-2 transition-colors peer"
                  autoComplete="off"
                />
                <label htmlFor="password" className="absolute font-bold left-3 top-1 text-textlight cursor-text peer-focus:text-xs peer-focus:-top-0 peer-focus:text-grey-600 transition-all">Password</label>
              </div>

              <button disabled={loader ? true : false}  className='bg-textdark w-[320px] mt-[25px] hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Login'
            } 
            </button>
            </form>
          </div>
          <div className="relative">
            <img
              src="../images/stickerfinalJPG.jpg"
              alt="img"
              className=" w-[320px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
