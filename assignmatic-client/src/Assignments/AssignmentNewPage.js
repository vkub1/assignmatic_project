import React, {useState, useEffect} from 'react'
import { Assignment } from '../requests'
import { useNavigate, useParams } from 'react-router'
import { useCodeJar } from 'react-codejar'


export default function AssignmentNewPage(props) {
    const [title, setTitle] = useState("")
    const [functions, setFunctions] = useState("")
    const [starter_code, setStarterCode] = useState("")
    const [instructions, setInstructions] = useState("")
    const params = useParams();
    const navigate = useNavigate()

    const highlight = editor => {
        let code = editor.textContent;
        code = code.replace(/\((\w+?)(\b)/g, '(<font color="#8a2be2">$1</font>$2');
        editor.innerHTML = code;
    };

    const editorRef = useCodeJar({
        starter_code, // Initial code value
        onUpdate: setStarterCode, // Update the text
        highlight, // Highlight function, receive the editor
        lineNumbers: true // Show line numbers
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(functions, starter_code);
        const assignmentParams = {
            assignment: {
                title: title,
                instructions: instructions,
                function: functions,
                starter_code: starter_code
            }
        }
        Assignment.create(params.course_id, assignmentParams).then(data => {
            if (data.errors) {
                props.setAlerts(data.errors)
            } else {
                navigate(`/courses/${params.course_id}`)
            }
        })
    }

    return (
        <main>
            <form onSubmit={event => {handleSubmit(event)}}>
                <label htmlFor="title" className="label">Title</label>
                <input className="field" type="text" name="title" id="title" onChange={event => {
                setTitle(event.currentTarget.value);}}/>   
                <div>
                    <div><label htmlFor="instructions" className="label">Instructions</label></div>
                    <textarea className="field textarea" type="text" name="instructions" id="instructions" 
                    onChange={event => {
                    setInstructions(event.currentTarget.value);}} />   
                </div>
                <label htmlFor="functions" className="label">Function Name(Use provided value in starter code)</label>
                <input className="field" type="text" name="functions" id="functions" onChange={event => {
                setFunctions(event.currentTarget.value);}}/> 
                <p className="label">Starter Code</p>
                <div className="editor-window" onUpdate={event => {
                    highlight(event.currentTarget);
                    console.log(event.currentTarget.textContent);
                }} 
                ref={editorRef}></div>
                  
                
                <input type="submit" className="button" value="Create Assignment" />
            </form>
        </main>
    )
}
