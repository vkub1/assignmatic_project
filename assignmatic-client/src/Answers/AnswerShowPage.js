import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/auth-context'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router'
import { Assignment, Course, Answer, Grade } from '../requests'
import { useCodeJar } from 'react-codejar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AnswerShowPage(props) {
    const [solution, setSolution] = useState("")
    const {user, teacher} = useContext(AuthContext)
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['teacher', 'user_id'])
    const [assignment, setAssignment] = useState({})
    
    const params = useParams()
    const [answer, setAnswer] = useState({})
    const [course, setCourse] = useState({})
    const [responses, setResponses] = useState([])
    const [grade, setGrade] = useState(0)
    const [comment, setComment] = useState("")
    
  

    const highlight = editor => {
        let code = editor.textContent;
        code = code.replace(/\((\w+?)(\b)/g, '(<font color="#8a2be2">$1</font>$2');
        editor.innerHTML = code;
    };

    const editorRef = useCodeJar({
        solution, // Initial code value
        highlight,
        onUpdate: setSolution, // Highlight function, receive the editor
        lineNumbers: true, // Show line numbers
        tab: '\t',
        catchTab: true,
        preserveIdent: true
    })

    


    const handleUpdate = () => {
        const answerParams = {
            answer: {
                solution: solution
            }
        } 
        Answer.update(params.course_id, params.assignment_id, params.id, answerParams).then(
            navigate(`/courses/${params.course_id}/assignments/${params.assignment_id}/answers`)
        )
    }

    const testAnswer = () => {
        let alerts = [];
        Answer.test(params.course_id, params.assignment_id, params.id).then(data => {
            if (data && data.responses) {
                data.responses.forEach((response, index) => {
                    console.log(response);
                    if (response.actual == response.expected) {
                        toast.success(`Test Case ${index + 1} Expected:${response.expected} Actual:${response.actual}`)
                    } else {
                        toast.error(`Test Case ${index + 1} Expected:${response.expected} Actual:${response.actual}`)
                    }
                })
                props.setAlerts(alerts)
            }
        })
    }
    

    useEffect(() => {
        Answer.show(params.course_id, params.assignment_id, params.id).then(answer => {
            setAnswer(answer)
            setSolution(answer.solution)
            document.querySelector('#solution-window').textContent = answer.solution
            highlight(document.querySelector('#solution-window'))
            Assignment.show(params.course_id, params.assignment_id).then(assignment => {
                setAssignment(assignment)
            })
        })
        
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const gradeParams = {
            grade: {
                grade: grade,
                comment: comment
            }
        }
        if (answer.grades.length > 0) {
            Grade.update(params.course_id, params.assignment_id, params.id, answer.grades[0].id, gradeParams).then(() => {
                navigate(`/courses/${params.course_id}/assignments/${params.assignment_id}/answers`)
            })
        } else {
            Grade.create(gradeParams, params.course_id, params.assignment_id, params.id).then(() => {
                navigate(`/courses/${params.course_id}/assignments/${params.assignment_id}/answers`)
            })
        }
    }
    

    return (
        <main>
            <ToastContainer position="top-center"/>
            <h1>Instructions</h1>
            <p>{assignment.instructions}</p>
            <h1>Solution</h1>
                
                <div id="solution-window" className="editor-window" ref={editorRef}></div>
            
            {
                
                <>
                    {
                        cookies && cookies.user_id !== cookies.teacher && answer &&
                        answer.grades  && answer.grades.length > 0 ?
                        <>
                            <div className="label">Grade Assigned</div>
                            <div className="field">{answer.grades[0].grade}</div>
                            <div className="label">Teacher Comments:</div>
                            <div className="field">{answer.grades[0].comment}</div>
                        </> : 
                        <> 
                            {
                                cookies && cookies.teacher === cookies.user_id ?
                        
                                <form onSubmit={event => {handleSubmit(event)}}>
                                    <label htmlFor="grade" className="label">Grade</label>
                                    {
                                        answer.grades && answer.grades.length > 0 ? 
                                        <>
                                            <input className="field" type="text" name="grade" id="grade" onChange={event => {
                                                setGrade(event.currentTarget.value);}} value={answer.grades[0].grade}/>   
                                            <div>
                                            <div>
                                                <label htmlFor="comment" className="label">Comment</label></div>
                                                <textarea className="field textarea" type="text" name="comment" id="comment" 
                                                onChange={event => {
                                                setComment(event.currentTarget.value);}} value={answer.grades[0].comment}/>   
                                            </div>
                                            <input type="submit" className="button" value="Update Grade" />
                                        </> :
                                        <>
                                            <input className="field" type="text" name="grade" id="grade" onChange={event => {
                                                    setGrade(event.currentTarget.value);}} />   
                                            <div>
                                                <div><label htmlFor="comment" className="label">Comment</label></div>
                                                <textarea className="field textarea" type="text" name="comment" id="comment" 
                                                onChange={event => {
                                                    setComment(event.currentTarget.value);}} />   
                                            </div>
                                            <input type="submit" className="button" value="Grade Answer" />
                                        </>
                                    }
                                </form> :  
                                <>
                                 {
                                     answer && !answer.graded ? 
                                     <div>
                                        <div className="button" onClick={handleUpdate}>Update Answer</div>
                                         {
                                             assignment && assignment.test_cases && assignment.test_cases.length > 0 ?
                                             <div className="button" onClick={testAnswer}>Test Answer</div>:
                                             null
                                         }

                                     </div>: null
                                 }
                                </>
                            }
                        </>
                    }
                </>
            }                    
                                              
        </main>
    )
}
