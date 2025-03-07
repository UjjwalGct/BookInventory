
import React, {useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Component } from 'react';
//import { useLoaderData } from 'react-router-dom';
import {AuthContext} from'../contects/AuthProvider';

import { FaBarsStaggered, FaBlog ,FaXmark} from 'react-icons/fa6'; // Removed FaXmax


const Navbar = () => {
  const [isMenueOpen,setIsMenuOpen] = useState(false);
  const [isSticky,setIsSticky] = useState(false);

  const {user} = useContext(AuthContext);
  console.log(user);
  //toggle menue 
  const toggleMenue = () =>{
    setIsMenuOpen(!isMenueOpen);

  }
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 100){
        setIsSticky(true);
      }
      else{
        setIsSticky(false);
      }
    }
    window.addEventListener("scroll",handleScroll);
    return () => {
      window.addEventListener("scroll",handleScroll);
    }
  },[])


  const navItems = [
    {link:"Home",path:"/home"},
    {link:"About",path:"/about"},
    {link:"Shop",path:"/shop"},
    {link:"Sell your Book",path:"/sell your Book"},
    {link:"Blog",path:"/blog"},
    
  ]

    return (
    
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transistion-all ease-in duration-300'>
      <nav className={`py-4 lg:px-24 ${isSticky ? "sticky top-10 left-0 right-0 bg-blue-300" : ""}`}>
        <div className='flex justify-between items-center text-base gap-8 '>{
        /* insert logo*/}
        <Link to="/" className='text-2xl font-bold text-blue-700 flex item-center gap-2'><FaBlog className='inline-block'/>Books</Link>

        {/*nav items for large device */}

        {
         <ul className='md:flex space-x-12 hidden'>
          {
          navItems.map(({ link, path }) => (
                <li key={path}>
                  <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                    {link}
                  </Link>
                </li>
              ))}
        </ul>
        
        }
      
      <div className='space-x-12 hidden lg:flex items-center'>
      <button>
        <FaBarsStaggered className='w-5 hover:text-blue-700' />
      </button>
    </div>

    {/*menu button*/}
    <div className='md:hidden'>
      <button onClick={toggleMenue} className='text-black focus:outline-none'>
        {
      isMenueOpen ?  <FaXmark className='h-5 w-5 text-black'/>: <FaBarsStaggered className='h-5 w-5 text-black'/>
        }
      </button>

    </div>
        </div>         
          
 {/* naitems for sm device*/}
 
  <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenueOpen ? " block fixed top-0 right-0 left-0" : "hidden"}`}>
  {
          navItems.map(({ link, path }) => (
                
                  <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer'>
                    {link}
                  </Link>
                
              ))}

 </div>

      </nav>
    </header>
  )
}

export default Navbar



