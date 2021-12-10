import React, { useState, useEffect } from 'react'
import { TestCase } from '../requests'
import { useNavigate, useParams } from 'react-router'

export default function TestCasesNew() {
    const [inputType, setInputType] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [outputValue, setOutputValue] = useState("")
    const params = useParams()
    const navigate = useNavigate()

    const handleInputTypeSelect = (event) => {
        setInputType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const testCaseParams = {
            input: {
                data_type: inputType,
                value: inputValue
            },  
            output: {
                value: outputValue
            }
        }
        TestCase.create(params.course_id, params.id, testCaseParams).then(data => {
            navigate(`/courses/${params.course_id}/assignments/${params.id}/answers`)
        })
    }

    return (
        <main>
            <h1>Create Test Case</h1>
            <form onSubmit={event => {handleSubmit(event)}}>
                <label className="label">
                    Input Type
                </label>
                    <select value={inputType} className="field" onChange={event => {handleInputTypeSelect(event)}}>
                        <option value="string">String</option>
                        <option value="integer">Integer</option>
                        <option value="float">Float</option>
                    </select>
                  
                <label htmlFor="inputValue" className="label">Input Value</label>
                <input className="field" type="text" name="inputValue" id="inputValue" onChange={event => {
                    setInputValue(event.currentTarget.value);}}/>
                <label htmlFor="outputValue" className="label">Output Value</label>
                <input className="field" type="text" name="outputValue" id="outputValue" onChange={event => {
                    setOutputValue(event.currentTarget.value);}}/>
                
                <input type="submit" className="button" value="Create Test Case" />
            </form>
        </main>
    )
}
