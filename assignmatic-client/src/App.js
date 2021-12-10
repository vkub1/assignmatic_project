import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import CoursesIndexPage from './Courses/CoursesIndexPage';
import CourseShowPage from './Courses/CourseShowPage';
import AssignmentShowPage from './Assignments/AssignmentShowPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import AuthContext from './context/auth-context';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import CourseNewPage from './Courses/CourseNewPage';
import CourseEditPage from './Courses/CourseEditPage';
import { User } from './requests';
import AnswerIndexPage from './Answers/AnswerIndexPage'
import { useCookies } from 'react-cookie'
import AnswerNewPage from './Answers/AnswerNewPage'
import AnswerShowPage from './Answers/AnswerShowPage'
import AnswerEditPage from './Answers/AnswerEditPage'
import AssignmentNewPage from './Assignments/AssignmentNewPage'
import TestCasesNew from './TestCases/TestCasesNew'
import LandingPage from './components/LandingPage';

library.add(fab, fas)

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['user_id', 'teacher'])
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState(null)
  const [teacher, setTeacher] = useState(null)

  useEffect(() => {
    getCurrentUser();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      console.log(alerts);
    },0)
    
  }, [alerts])

  const getCurrentUser = () => {
    if (cookie.user_id) {
      User.show(cookie.user_id).then(user => setUser(user)) 
    }
  }

  const onSignOut = () => { 
    removeCookie()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user: user, setUser, teacher: teacher, setTeacher }}>
      
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
       integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn"
        crossOrigin="anonymous" />
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>
      
      <div className="App">
        <BrowserRouter>
          <NavBar currentUser={user} onSignOut={onSignOut}/>
          <div>
            {
              alerts ? alerts.map((alert, index) => {
                return(
                    <div className="alert alert-danger alert-dismissible fade show alert-box" key={index} role="alert">
                    {alert}
                    <button type="button" class="close" data-dismiss="alert" data-id={index} 
                    onClick={event => {
                      const id = parseInt(event.currentTarget.getAttribute('data-id'));
                      if (alerts.length === 1) {
                        setAlerts([])
                      } else {
                        setAlerts(alerts.splice(id, 1))
                      }
                    }}
                      aria-label="Close" on>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                  )
              }): null
            }
        </div>
          <Routes>
            <Route path="/courses" element={<CoursesIndexPage setAlerts={setAlerts} />}/>
              <Route path="courses/new" element={ (() => {
                if (cookie.user_id) {
                  return <CourseNewPage setAlerts={setAlerts}/>
                } 
                return <Navigate to="/sign_in"/>
                
              })()}/>
            <Route path="/courses/:id/edit" element={ (() => {
                if (cookie.user_id) {
                  return <CourseEditPage />
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route exact path="/courses/:course_id" element={<CourseShowPage />} />
            <Route exact path="/courses/:course_id/assignments/:id/answers" element={ (() => {
                if (cookie.user_id) {
                  return <AnswerIndexPage />
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route exact path="/courses/:course_id/assignments/:id/test_cases/new" element={ (() => {
                if (cookie.user_id) {
                  return <TestCasesNew setAlerts={setAlerts} />
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route exact path="/courses/:course_id/assignments/new" element={ (() => {
                if (cookie.user_id) {
                  return <AssignmentNewPage setAlerts={setAlerts} />
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route exact path="/assignments/:assignment_id/answers/:id/edit" element={ (() => {
                if (cookie.user_id) {
                  return <AnswerEditPage setAlerts={setAlerts} />
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route exact path="/courses/:course_id/assignments/:assignment_id/answers/:id" element={ (() => {
                if (cookie.user_id) {
                  return <AnswerShowPage setAlerts={setAlerts} />
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route exact path="courses/:course_id/assignments/:id" element={ (() => {
                if (cookie.user_id) {
                  return <AssignmentShowPage />
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route exact path="courses/:course_id/assignments/:id/answers/new" element={ (() => {
                if (cookie.user_id) {
                  return <AnswerNewPage setAlerts={setAlerts}/>
                } 
                return <Navigate to="/sign_in"/>
                
              })()} />
            <Route path="/sign_in" element={<SignInPage  onSignIn={getCurrentUser} setUser={setUser} user={user}/>} />
            <Route
              exact path='/sign_up'
              element={<SignUpPage onSignUp={getCurrentUser} />}
            ></Route>
            
            <Route path="/" element={<LandingPage />} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
      

      </AuthContext.Provider>
  );
}


export default App;
