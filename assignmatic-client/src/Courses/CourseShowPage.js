import React, {useEffect, useState, useContext} from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { Course, Enrollment, User } from '../requests'
import { useCookies } from 'react-cookie'
import './CourseShow.css'
import AuthContext from '../context/auth-context'

export default function CourseShowPage() {
    const { user, teacher, setTeacher } = useContext(AuthContext)
    const [cookies, setCookie, removeCookie] = useCookies('teacher')
    const navigate = useNavigate();
    const params = useParams();
    const [course, setCourse] = useState({})
    const [enrolled, setEnrolled] = useState([]) 

    useEffect(() => {
        Course.show(params.course_id, params.id).then(course => {
            setCourse(course)
            User.show(course.teacher.id).then(user => {
                console.log(user);
                if (cookies && cookies.teacher) {
                    removeCookie('teacher')
                }
                setCookie('teacher', user.id)
                setTeacher(user)
            })
            const enrolledUsers = []
            course.enrolled_users.forEach((user) => {
                enrolledUsers.push(user.id)
            })
            setEnrolled(enrolledUsers)
        }   
        )
    }, [])

    const handleEnroll = () => {
        if (user && course) {
            const paramsEnrollment = {
                enrollment: {
                    course_id: course.id,
                    user_id: user.id
                }
            }
            Enrollment.create(paramsEnrollment).then(() => {
                Course.show(params.course_id, params.id).then(course => {
                    setCourse(course)
                    User.show(course.teacher.id).then(user => {
                        console.log(user);
                        setCookie('teacher', user.id)
                        setTeacher(user)
                    })
                    const enrolledUsers = []
                    course.enrolled_users.forEach((user) => {
                        enrolledUsers.push(user.id)
                    })
                    setEnrolled(enrolledUsers)
                }   
                )
            })
        } 
    }


    const navigateToAssignment = (event) => {
        const id = event.currentTarget.getAttribute('data-id')
        navigate(`/courses/${params.course_id}/assignments/${id}/answers`)
    }


    const handleDelete = () => {
        if (window.confirm("Are you sure you want to permanently delete this course?")) {
            Course.destroy(course.id).then(() => {
                navigate('/courses')
            })
        }
    }

    const editPath = `/courses/${course.id}/edit`
    
    return (
        <div id="course-info">
            <section className="course-image">

            </section>
            <div id="course-title">
                    <i className="fab fa-js-square fa-5x" id="course-icon"></i>
                    
                </div>
            <div id="course-block">
                
                <div className="course-block" id="course-description-block">
                    <h2>Course Description</h2>
                    <div id="course-description"><p>{course.description}</p></div>
                    {
                        (teacher && user) && teacher === user.id ? <div id="course-buttons">
                            <NavLink className="button" to={editPath}>Edit Course</NavLink>
                            <div className="button" onClick={handleDelete}>Delete Course</div>
                        </div>: null
                    }
                </div>
                {
                    (enrolled && user) && enrolled.includes(user.id) ?  
                    <div className="course-block" id="assignments-block">
                    {
                        course.assignments && course.assignments.length > 0 ? <h2>Assignments</h2>: <></>
                    }
                        
                    {
                    course.assignments ?
                    <div className="assignment-cards">
                        {
                            course.assignments.map(assignment => {
                                return(
                                    <div className="assignment-card-cont" data-id={assignment.id} key={assignment.id} 
                                    onClick={event => navigateToAssignment(event)}>
                                        <p>{assignment.title}</p>
                                        
                                    </div>
                                )
                            })
                                
                        }
                    
                    </div> :null
                }
                </div>:
                    null
                }
            
            {
               user && teacher && user.id === teacher.id ? <div className="button" onClick={() => {
                   navigate(`/courses/${course.id}/assignments/new`)
               }}>Add Assignment</div>:<></>
            }
                
            
            </div>
            { user && enrolled && !enrolled.includes(user.id) ? 
                    <div className="button" onClick={handleEnroll}>Enroll in Course</div>
                    : null
            }
        </div>
    )
}
