import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';


export default function CoursesList(props) {
    const navigate = useNavigate();

    const directToShow = (event) => {
        const courseId = event.currentTarget.getAttribute('data-id');
        navigate(`/courses/${courseId}`)
    }


    return (
        props.list.map((element) => {
            return(
                <div className="class-card" key={element.id} data-id={element.id} onClick={event => {directToShow(event)}}>
                    <FontAwesomeIcon className="class-card-icon" icon={["fab", 'js-square']} />
                    <div className="class-card-body">
                        <h3>{element.title}</h3>
                        <div className="course-details">
                            <i className="fas fa-file"></i>
                            <p className="assignment-count">{element.assignments.length} Assignments</p>
                        </div>

                    </div>
                </div>
            )
        })
        
    )
}
