const baseUrl = "http://localhost:3000/api/v1";

export const Course = {
    index() {
        return fetch(`${baseUrl}/courses`).then(res => res.json())
    },
    show(id) {
        return fetch(`${baseUrl}/courses/${id}`).then(res => res.json())
    },
    create(params) {
        return fetch(`${baseUrl}/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    },
    update(id, params) {
        return fetch(`${baseUrl}/courses/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res=> res.json())
    },
    destroy(id) {
        return fetch(`${baseUrl}/courses/${id}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.json())
    },
    teacher(id) {
        return fetch(`${baseUrl}/courses/${id}/teacher`).then(res=> res.json())
    }

}

export const Assignment = {
    index(course_id) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments`).then(res=>res.json())
    },
    show(course_id, id) {
        console.log(`${baseUrl}/courses/${course_id}/assignments/${id}`);
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${id}`).then(res => res.json())
    },
    create(course_id, params) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    },
    update(course_id, id, params) {
        
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    }
}


export const Session = {
    create(params) {
        return fetch(`${baseUrl}/session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    },
    destroy() {
        return fetch(`${baseUrl}/session`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(res => res.json())
    }
}

export const User = {
    show(id) {
        return fetch(`${baseUrl}/users/${id}`, {
            credentials: 'include'
        }).then(res => res.json())
    },
    create(params) {
        return fetch(`${baseUrl}/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: params })
        }).then(res => res.json())
    }
}

export const Answer = {
    index(course_id, id) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${id}/answers`).then(res => res.json())
    },
    create(course_id, id, params) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${id}/answers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    },
    show(course_id, assignment_id, id) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${assignment_id}/answers/${id}`).then(res => res.json())
    },
    update(course_id, assignment_id, id, params) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${assignment_id}/answers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    },
    test(course_id, assignment_id, id) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${assignment_id}/answers/${id}/test`).then(res=> res.json())
    }
}

export const Enrollment = {
    create(params) {
        return fetch(`${baseUrl}/enrollments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    }
}

export const Grade = {
    create(params,course_id, assignment_id, answer_id) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${assignment_id}/answers/${answer_id}/grades`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    },
    show(assignment_id, answer_id, id) {
        return fetch(`${baseUrl}/assignment/${assignment_id}/answers/${answer_id}/grades/${id}`)
        .then(res => res.json())
    },
    update(course_id, assignment_id, answer_id, id, params) {
        return fetch(`${baseUrl}/courses/${course_id}/assignment/${assignment_id}/answers/${answer_id}/grades/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    }
}

export const TestCase = {
    show(course_id, assignment_id, id) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${assignment_id}/test_cases/${id}`).then(res => res.json())
    }, 
    create(course_id, assignment_id, params) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${assignment_id}/test_cases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    },
    update(course_id, assignment_id, id, params) {
        return fetch(`${baseUrl}/courses/${course_id}/assignments/${assignment_id}/test_cases/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(params)
        }).then(res => res.json())
    }
}