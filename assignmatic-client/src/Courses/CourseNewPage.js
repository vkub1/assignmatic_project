import React, {useState, useContext} from 'react'
import { Course } from '../requests'
import { useNavigate } from 'react-router'
import AuthContext from '../context/auth-context';

export default function CourseNewPage(props) {
    const navigate = useNavigate();
    const user = useContext(AuthContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const params = {
            title: title,
            description: description,
            user: user.user.id
        }
        Course.create(params).then(data => {
            if (data.id) {
                props.setAlerts(["Course created successfully!"])
                navigate('/courses')
            } else {
                props.setAlerts(data.errors)
                
            }
        })
    }

    return (
        <main>
            <h1>Create Course</h1>
            <form onSubmit={event => {handleSubmit(event)}}>
                <label htmlFor="title" className="label">Title</label>
                <input className="field" type="text" name="title" id="title" onChange={event => {
                        setTitle(event.currentTarget.value);}}/>   
                  
                <div>
                    <div><label htmlFor="description" className="label">Course Description</label></div>
                    <textarea className="field textarea" type="text" name="description" id="description" 
                    onChange={event => {
                        setDescription(event.currentTarget.value);}}/>   
                </div>
                
                <input type="submit" className="button" value="Create Course" />
            </form>
        </main>
    )
}
