import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-slate-200'>
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4">
        <Link><h1 className='font-bold'>React Auth</h1></Link>
        <ul className='flex gap-4'>
          <Link to="/"><li>Home</li></Link>
          <Link to="/about"><li>About</li></Link>
          <Link to="sign-in"><li>SignIn</li></Link>
          <Link to="sign-up"><li>SignUp</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Header