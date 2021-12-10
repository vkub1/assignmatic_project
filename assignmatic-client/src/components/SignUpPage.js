import React, { useContext} from 'react';
import AuthContext from '../context/auth-context';
import { User } from '../requests';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const SignUpPage = (props) => {
    const [cookies, setCookie] = useCookies('user_id')
    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const { onSignUp } = props;

    const handleSubmit = event => {
        const { currentTarget } = event
        event.preventDefault()
        const formData = new FormData(currentTarget)
        const params = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation')
        }
        User.create(params).then(user => {
            console.log(user);
            if (user.user?.id){
                setCookie('user_id', user.user.id, {path: '/'})
                setUser(user.user)
                navigate('/courses') //navigate to index
            }
        })
    }
    return(
        <main>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="label">Name</label>
                <input className="field" type="text" name="name" id="name" />   
                <label htmlFor="email" className="label">Email</label>
                <input className="field" type="text" name="email" id="email" />   
        
                <div>
                    <div><label htmlFor="password" className="label">Password</label></div>
                    <input className="field" type="password" name="password" id="password" />   
                </div>
                <div>
                    <label htmlFor="password_confirmation" className="label">Password Confirmation</label>
                    <input className="field" type="password" name="password_confirmation" id="password_confirmation" />   
                </div>
                <input type="submit" className="button" value="Sign Up" />
            </form>
        </main>
    )
}

export default SignUpPage;