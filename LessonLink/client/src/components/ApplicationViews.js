import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import TeacherList from "./teacher/TeacherList";
import TeacherDetails from "./teacher/TeacherDetails";
import TeacherEditForm from "./teacher/TeacherEditForm";
import TeacherDeleteCheck from "./teacher/TeacherDeleteCheck";
import StudentList from "./student/StudentList";
import StudentAddForm from "./student/StudentAddForm";
import StudentEditForm from "./student/StudentEditForm";
import StudentDeleteCheck from "./student/StudentDeleteCheck";
import LessonList from "./lesson/LessonList";
import LessonDetails from "./lesson/LessonDetails";
import LessonAddForm from "./lesson/LessonAddForm";
import StudentDetails from "./student/StudentDetails";
import LessonCalendar from "./lesson/LessonCalendar";


export default function ApplicationViews({ isLoggedIn, userProfile }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Home userProfile={userProfile} /> : <Navigate to="/login" />}
                    />

                    <Route path="teachers">
                        <Route index element={isLoggedIn ? <TeacherList userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="edit/:teacherId" element={isLoggedIn ? <TeacherEditForm /> : <Navigate to="/login" />} />
                        <Route path="delete/:teacherId" element={isLoggedIn ? <TeacherDeleteCheck /> : <Navigate to="/login" />} />
                        <Route path="details/:teacherId" element={isLoggedIn ? <TeacherDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>

                    <Route path="students">
                        <Route path=":teacherId" element={isLoggedIn ? <StudentList /> : <Navigate to="/login" />} />
                        <Route path="add" element={isLoggedIn ? <StudentAddForm userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path=":teacherId/edit/:studentId" element={isLoggedIn ? <StudentEditForm userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path=":teacherId/delete/:studentId" element={isLoggedIn ? <StudentDeleteCheck userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="details/:studentId" element={isLoggedIn ? <StudentDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>

                    <Route path="lessons">
                        <Route path=":teacherId" element={isLoggedIn ? <LessonCalendar /> : <Navigate to="/login" />} />
                        <Route path="add" element={isLoggedIn ? <LessonAddForm userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="details/:teacherId" element={isLoggedIn ? <LessonDetails userProfile={userProfile} /> : <Navigate to="/login" />} />
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route >
            </Routes >
        </main >
    );
};
