import React, {useState, useEffect} from 'react'

export default function AlertList(props) {


    useEffect(() => {
        setTimeout(() => {
            props.setAlert(props.list)
        }, 0)
        
    }, [props.list])
    
    const hideAlert = (id) => {
        console.log(id);
        props.list.slice(id, 1)
        console.log(props.list);
    }

    return (
        <div>
            {
                props.list ? props.list.map((alert, index) => {
                    if (!alert.dismissed) {
                        return(
                            <div className="alert alert-warning alert-dismissible fade show alert-box" key={index} role="alert">
                            {alert.message}
                            <button type="button" class="close" data-dismiss="alert" data-id={index} onClick={event => 
                                {
                                    hideAlert(event.currentTarget.getAttribute('data-id'))
                                }} aria-label="Close" on>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        )
                    } else {
                        return(
                            <></>
                        )
                    }
                    
                }): null
            }
        </div>
    )
}
