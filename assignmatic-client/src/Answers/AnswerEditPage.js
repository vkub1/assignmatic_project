import React, { useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router'
import { Answer, Assignment } from '../requests'
import { useCookies } from 'react-cookie'

export default function AnswerEditPage() {
    const [assignment, setAssignment] = useState({})
    const [answer, setAnswer] = useState({})
    const navigate = useNavigate()
    const [solution, setSolution] = useState("")
    const [cookies, setCookie] = useCookies('user_id')
    const params = useParams()

    useEffect(() => {
        Assignment.show(params.assignment_id).then(assignment => {
            setAssignment(assignment)
        })
        Answer.show(params.assignment_id,params.id).then(answer => {
            setAnswer(answer)
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (assignment && cookies) {
            const params = {
                answer: {
                    solution: solution,
                    user_id: cookies.user_id,
                    assignment_id: assignment.id 
                }
            }
            Answer.create(assignment.id, params).then(() => {
                navigate(`/courses/${assignment.course_id}`)
            })

        }
        
    }

    return (
        <>
            <h1>Submit Answer</h1>
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
                            <textarea className="field textarea" type="text" name="solution" id="solution" 
                            onChange={(event) => {setSolution(event.currentTarget.value)}}/>   
                        </div>
                        
                        <input type="submit" className="button" value="Submit Answer" />
                    </form>
                </div>
            </div>
            
        </>
    )
}
