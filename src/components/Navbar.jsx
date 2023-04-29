import React, { useState } from 'react';
import { logo, close, menu } from '../assets';
import { navLinks } from '../constants';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="dExchange" className='w-[124px] h-[32px]' />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {
          navLinks.map((nav, index) => (
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`} key={nav.id}>
              <HashLink
                to={`/#${nav.id}`}
                className='transition ease-in-out duration-300 hover:text-secondary'
                smooth
              >
                {nav.title}
              </HashLink>
            </li>
          ))
        }
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img src={toggle ? close : menu } alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer'
          onClick={() => setToggle((prev) => !prev)} />
        <div className={`${toggle? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {
              navLinks.map((nav, index) => (
                <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'}`} key={nav.id}>
                  <HashLink
                    to={`/#${nav.id}`}
                    className='transition ease-in-out duration-300 hover:text-secondary'
                    smooth
                  >
                    {nav.title}
                  </HashLink>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar