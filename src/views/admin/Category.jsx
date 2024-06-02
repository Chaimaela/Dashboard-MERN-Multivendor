import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaE } from 'react-icons/fa6';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaImage } from "react-icons/fa"; 
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../../utils/utils';
import { categoryAdd, messageClear,get_category, deleteCategory } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Search from '../components/Search';

const Category = () => {

    const dispatch = useDispatch()
    const {loader,successMessage,errorMessage,categorys} = useSelector(state=> state.category)



    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] =  useState(false)
    const [imageShow, setImage] = useState('')

    const [state, setState] = useState({

        name: '',
        image: ''

    })


    const imageHandle = (e) => {
        let files = e.target.files 
        if (files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
        }
    }


    const add_category = (e) => {
        e.preventDefault()
        dispatch(categoryAdd(state))
        // console.log(state)
    }

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
            setState({
                name: '',
                image: ''
            }) 
            setImage('')

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        

    },[successMessage,errorMessage])
   
    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_category(obj))

    },[searchValue, currentPage,parPage])


    const deleteCategoryHandler = (categoryId) => {
        dispatch(deleteCategory(categoryId));
    };


    return (
        <div className='px-2 lg:px-7 pt-5'>

        <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-black rounded-md'>
            <h1 className='text-[#d0d2d6] font-semibold text-lg'>Category</h1>
            <button onClick={() => setShow(true)} className='bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm'>Add</button>

        </div>




            <div className='flex flex-wrap w-full'>
                <div className='w-full lg:w-7/12'>
                <div className='w-full p-4 bg-[#1d1c22] rounded-md'>
                
               <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}  />

   <div className='relative overflow-x-auto'>
    <table className='w-full text-sm text-left text-[#d0d2d6]'>
        <thead className='text-sm text-[#fff] uppercase border-b border-slate-200'>
        <tr>
            <th scope='col' className='py-3 px-4'>No</th>
            <th scope='col' className='py-3 px-4'>Image</th>
            <th scope='col' className='py-3 px-4'>Name</th>
            <th scope='col' className='py-3 px-4'>Action</th> 
        </tr>
        </thead>

        <tbody>
            {
                categorys.map((d, i) => <tr key={i}>
                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i+1}</td>
                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                    <img className='w-[45px] h-[45px]' src={d.image} alt="" />
                </td>
                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.name}</td>
                 
                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-4'>
                    <Link className='p-[6px] text-white rounded hover:shadow-lg hover:shadow-gray-600/50'> <FaEdit/> </Link> 
                    <Link onClick={() => deleteCategoryHandler(d._id)} className='p-[6px] text-white rounded hover:shadow-lg hover:shadow-gray-600/50'> <FaTrash/> </Link> 
                    </div>
                    
                    </td>
            </tr> )
            }

            
        </tbody> 
    </table> 
    </div>  

    <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
        <Pagination 
            pageNumber = {currentPage}
            setPageNumber = {setCurrentPage}
            totalItem = {50}
            parPage = {parPage}
            showItem = {3}
        />
        </div>



                </div>

                </div>

    <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500 `} >
    <div className='w-full pl-5'>
        <div className='bg-[#1d1c22] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-white'>

            <div className='flex justify-between items-center mb-4' >
            <h1 className='text-[#fff] font-semibold text-xl pt-2 mb-4 w-full text-center '>Add Category</h1>

            <div onClick={() => setShow(false) } className='block lg:hidden'>
            <IoMdCloseCircle /> 
            </div>
            </div>


            <form onSubmit={add_category}>
                <div className='flex flex-col w-full gap-1 mb-3'>
                    <label htmlFor="name"> Category Name</label>
                    <input value={state.name} onChange={(e)=>setState({...state,name : e.target.value})} className='px-4 py-2 focus:border-slate-500 outline-none bg-[#f4f4f4] border border-slate-700 rounded-md text-[#000000]' type="text" id='name' name='category_name' placeholder='Category Name' />
                 </div>

                 <div>
                    <label className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]'  htmlFor="image">
                        {
                          imageShow ? <img className='w-full h-full' src={imageShow} /> : <>
                        <span><FaImage/> </span>
                        <span>Select Image</span> 
                          </>
                        }
                        
                    </label>
                    <input onChange={imageHandle} className='hidden' type="file" name="image" id="image" />
            <div className='mt-4'>
            <button disabled={loader ? true : false}  className='bg-gray-600 w-full hover:shadow-gray-700/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
            {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add Category'
            } 
            </button> 

            </div>

                 </div>

                 
            </form>

        </div>
        
     </div>

    </div>

            </div>
            
        </div>
    );
};

export default Category;