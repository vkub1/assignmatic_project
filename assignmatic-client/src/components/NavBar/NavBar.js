import React from 'react'
import logo from './logo.jpeg'
import {NavLink, useNavigate} from 'react-router-dom'
import './NavBar.css'
import { Session } from '../../requests'



export default function NavBar({currentUser, onSignOut}) {
    const navigate = useNavigate()
    const handleSignOut = () => {
        onSignOut()
        Session.destroy().then(() => {
            navigate('/sign_in')
        })
    }
    return (
            
            <header className="navbar">
                <NavLink to="/"><div id="logo" ><img src={logo} alt="logo"/></div></NavLink>
                <nav className="nav">
                    <NavLink to="/courses" className="links">Courses</NavLink>
                    {
                currentUser ? (
                    <>
                        <p className="links welcome">Welcome {currentUser.name}</p>
                        <NavLink to='/courses/new' className="links">Create Course</NavLink>
                        
                        <p className="links" onClick={handleSignOut}>Sign Out</p>
                    </>
                ) : (
                    <>
                        <NavLink to='sign_in' className='links'>Sign In</NavLink>
                        <NavLink to='sign_up' className='links'>Sign Up</NavLink>
                    </>
                )
            }
                    
                </nav>
            </header>
        
    )
}
