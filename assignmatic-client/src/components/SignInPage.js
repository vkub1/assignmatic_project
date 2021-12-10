import React, { useState, useContext } from 'react';
import { Session } from '../requests';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth-context';
import { useCookies } from 'react-cookie'


function SignInPage(props) {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['user_id'])

    function handleSubmit(event) {
        event.preventDefault();
        const params = {
            email: email,
            password: password
        }
        Session.create(params).then(data => {
            console.log(data);
            if (data.user) {
                setUser(data.user)
                setCookie('user_id', data.user.id, { path: '/'})
                navigate('/courses')
            }
        })
    }

   

    return (
        
        <main>
            <h1>Sign In</h1>
            <form onSubmit={event => {handleSubmit(event)}}>
                <div>
                    <label htmlFor="email" className="label">Email</label>
                    <input className="field" type="text" name="email" id="email" onChange={event => {
                        setEmail(event.currentTarget.value);
                    }} />
                </div>
                <div>
                    <label htmlFor="password" className="label">Password</label>
                    <input className="field" type="password" name="password" id="password" onChange={event => {
                        setPassword(event.currentTarget.value)
                    }} />
                </div>
                <input type="submit" className="button" value="Sign In" />
            </form>
            
        </main>
       
    )
}

export default SignInPage;