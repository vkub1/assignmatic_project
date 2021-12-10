import React, {useEffect, useState} from 'react'
import { Course } from '../requests'
import { useNavigate, useParams } from 'react-router'


export default function CourseEditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [course, setCourse] = useState({})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        Course.show(params.id).then(course => {
            if (course) {
                setCourse(course)
                setTitle(course.title)
                setDescription(course.description)
            }
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const params = {
            title: title,
            description: description
        }
        Course.update(course.id, params).then(data => {
            if (data.id) {
                navigate(`/courses/${course.id}`)
            }
        })
    }
    return (
        <main>
            <h1>Edit Course</h1>
            <form onSubmit={event => {handleSubmit(event)}}>
                <label htmlFor="title" className="label">Title</label>
                <input className="field" type="text" name="title" id="title" value={title} onChange={event => {
                        setTitle(event.currentTarget.value);}}/>     
                <div>
                    <div><label htmlFor="description" className="label">Course Description</label></div>
                    <textarea className="field textarea" type="text" name="description" id="description" 
                    onChange={event => {
                        setDescription(event.currentTarget.value);}} value={description}/>   
                </div>
                
                <input type="submit" className="button" value="Edit Course" />
            </form>
        </main>
    )
}
