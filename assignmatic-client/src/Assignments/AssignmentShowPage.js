import React, {useState, useEffect} from 'react'
import { Assignment } from '../requests'
import { useParams, useNavigate } from 'react-router-dom'
import { useCodeJar } from 'react-codejar'
import AnswerNewPage from '../Answers/AnswerNewPage'

import './AssignmentsShow.css'

export default function AssignmentShowPage() {
    const params = useParams()
    const [solution, setSolution] = useState("")
    const [assignment, setAssignment] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        Assignment.show(params.course_id, params.id).then(assignment => {
            setAssignment(assignment)
            setSolution(assignment.answers[0].solution)
        })
    }, [])

    


    return (
        <div id="assignment-info">
            <div id="assignment-instructions">
                <h2>Instructions</h2>
                <p className="text-block">{assignment.instructions}</p>
            </div>
            
            <div id="assignment-solution">
                
                {assignment.answers ? 
                    <>
                    <h2>Answer</h2>
                    {
                    assignment.answers.map((answer, user) => {
                        return(
                            answer && user && answer.user_id === user.id ?
                            <div key={answer.id} >
                                <AnswerNewPage />
                            </div>:
                            null
                        )
                    }) }</>: null
                }
            </div>
        </div>
    )
}
