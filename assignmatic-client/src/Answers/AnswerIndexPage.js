import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'
import { Answer, Course, Assignment, Grade } from '../requests'
import { useCookies } from 'react-cookie'
import './AnswerIndex.css'
import AuthContext from '../context/auth-context'




export default function AnswerIndexPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [answers, setAnswers ] = useState([]);
    const [userAnswered, setUserAnswered] = useState(false);
    const { user, teacher, setTeacher } = useContext(AuthContext)
    const [enrolledStudent, setEnrolledStudent] = useState(false) 
    const [assignment, setAssignment] = useState({})
    const [cookies, setCookie] = useCookies(['user_id', 'teacher'])
    const [{ course }, setCourse ] = useState({})
    

    const handleNewTestCase = () => {
        navigate(`/courses/${params.course_id}/assignments/${params.id}/test_cases/new`)
    } 

    useEffect(() => {
        if (teacher !== user) {
            setEnrolledStudent(true)
        }
        Answer.index(params.course_id, params.id).then(answers => {
            if (answers) {
                answers.forEach((answer) => {
                if (user && answer.user_id === user.id) {
                    setUserAnswered(true);
                } 
                }) 
            }
                setAnswers(answers)
            }
        )
        Assignment.show(params.course_id, params.id).then(assignmentData => {
            setAssignment(assignmentData)
            console.log(enrolledStudent);
            Course.show(assignmentData.course.id).then(course => {
                setTeacher(course.teacher)
                setCourse(course)
                
            })
        })
        
    }, [])

    const handleAddAnswer = () => {
        navigate(`/courses/${params.course_id}/assignments/${params.id}/answers/new`)
    }

    const handleGrade = (event) => {
        const id = event.currentTarget.getAttribute('data-id')
        navigate(`/courses/${params.course_id}/assignments/${assignment.id}/answers/${id}`)
    }

    const handleShowAnswer = (event) => {
        const id = event.currentTarget.getAttribute('data-id') 
        navigate(`/courses/${params.course_id}/assignments/${params.id}/answers/${id}`)
    }
    
    return(
        <main>
        <div id="assignment-instructions">
                <div>
                    <h1>Instructions: </h1>
                    <p className="text-block">{assignment.instructions}</p>
                    {
                        cookies && cookies.teacher === cookies.user_id ? 
                        <div className="button" onClick={handleNewTestCase}>Add Test Case</div>:
                        null
                    }
                </div>
                
                {
                    cookies && cookies.teacher === cookies.user_id && assignment && assignment.test_cases ?
                    <div id="test-cases-container">
                    {
                        assignment.test_cases.map((test_case, index) => {
                            return(
                                <div key={test_case.id} className="test-case-card"><p>{`Test Case #${index + 1}`}</p></div>
                            )
                        }) 
                    }</div>: null 
                }
                 
        </div>
        
        
        <div id="student-submissons-container">
        { teacher && user && teacher.id === user.id ? 
            <div className="label" >Student Submissions</div>
        : <>
            { enrolledStudent && userAnswered? <h1 >Your Submission:</h1>: <></>}
        </>}

        
        
        <div className="answer-cards">
            {
                answers && answers.length > 0 ? answers.map((answer) => {
                    if (teacher && user && teacher.id === user.id) {
                        return(
                            <div  data-id={answer.id} className="answer-card" onClick={handleGrade} data-id={answer.id}>
                                <p>{answer.user.name}</p>
                                {
                                  answer.graded ? 
                                  <p>
                                     Edit Grade
                                  </p> : <p>Not Graded</p>
                                }
                                
                            </div> 
                        )
                    } else {
                        return(
                            <div key={answer.id}>
                                {
                                    answer && user && answer.user_id === user.id ?
                                    <div  data-id={answer.id} className="answer-card" onClick={handleShowAnswer}>
                                        <p>{answer.user.name}</p>
                                        {answer.grades && answer.grades.length > 0 ? <p>Graded {answer.grades[0].grade}%</p>: <p>Click to view</p>}
                                        
                                    </div>
                                    : null
                                }
                            </div>
                        )
                    }
                }): null
            }
        </div>
        <div id="edit-assignment">
            {
                !userAnswered && cookies && cookies.user_id !== cookies.teacher
                ? <div className="button" onClick={handleAddAnswer}>Add Answer</div>: null
            
            }
            {
                cookies && cookies.user_id === cookies.teacher ? 
                <> 
                    <div className="button">Edit Assignment</div>
                </>: null
            }
        </div>
        </div>
        </main>
    )
}
