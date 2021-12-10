import React, {useEffect, useState} from 'react'
import {Course} from '../requests'
import CoursesList from './CoursesList'
import './CourseIndex.css'

export default function CoursesIndexPage() {
    const [courses, setCourses] = useState([])

    useEffect(() => {

        Course.index().then(courses => {
            
            setCourses(courses)
        })
    }, [])

    return (
        <div id="class-cards">
        <CoursesList list={courses} />
        </div>
    )
}
