import React, { useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router'
import { Answer, Assignment } from '../requests'
import { useCookies } from 'react-cookie'
import { useCodeJar } from "react-codejar";



export default function AnswerNewPage() {
    const [assignment, setAssignment] = useState({})
    const navigate = useNavigate()
    const [solution, setSolution] = useState("")
    const [starterCode, setStarterCode] = useState("")
    const [cookies, setCookie] = useCookies('user_id')
    const params = useParams()

    const highlight = editor => {
        let code = editor.textContent;
        code = code.replace(/\((\w+?)(\b)/g, '(<font color="#8a2be2">$1</font>$2');
        editor.innerHTML = code;
    };
    
    const editorRef = useCodeJar({
        starterCode, // Initial code value
        onUpdate: setSolution, // Update the text
        highlight, // Highlight function, receive the editor
        lineNumbers: true // Show line numbers
    });



    useEffect(() => {
        Assignment.show(params.course_id, params.id).then(assignment => {
            setAssignment(assignment)
            setStarterCode(assignment.starter_code)
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (assignment && cookies) {
            const paramsAnswer = {
                answer: {
                    solution: solution,
                    user_id: cookies.user_id,
                    assignment_id: assignment.id 
                }
            }
            Answer.create(params.course_id, params.assignment_id, paramsAnswer).then(() => {
                navigate(`/courses/${params.course_id}/assignments/${params.id}/answers`)
            })

        }
        
    }

    return (
        <main>
            <div id="answer-form">
                <div>
                    {assignment ?
                    <> 
                        <h2>{assignment.title}</h2>
                        <p>{assignment.instructions}</p>
                    </>
                    :null
                }
                </div>
                <div>
                    <form onSubmit={event => {handleSubmit(event)}}>  
                        <div>
                            <div><label htmlFor="solution" className="label">Solution</label></div>
                            <div className="editor-window" onUpdate={event => {highlight(event.currentTarget)}} ref={editorRef}>{starterCode}</div>
                        </div >

                        <input type="submit" className="button" value="Submit Answer" />
                    </form>
                </div>
            </div>
            
        </main>
    )
}
