import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Home";
import TeacherList from "./TeacherList";
import TeacherEditForm from "./TeacherEditForm";
import TeacherDeleteCheck from "./TeacherDeleteCheck";
import StudentList from "./StudentList";
import StudentAddForm from "./StudentAddForm";
import StudentEditForm from "./StudentEditForm";
import StudentDeleteCheck from "./StudentDeleteCheck";


export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                    />

                    <Route path="teachers">
                        <Route index element={isLoggedIn ? <TeacherList /> : <Navigate to="/login" />} />
                        <Route path="edit/:teacherId" element={isLoggedIn ? <TeacherEditForm /> : <Navigate to="/login" />} />
                        <Route path="delete/:teacherId" element={isLoggedIn ? <TeacherDeleteCheck /> : <Navigate to="/login" />} />
                    </Route>

                    <Route path="students/">
                        <Route path=":teacherId" element={isLoggedIn ? <StudentList /> : <Navigate to="/login" />} />
                        <Route path="add" element={isLoggedIn ? <StudentAddForm /> : <Navigate to="/login" />} />
                        <Route path=":teacherId/edit/:studentId" element={isLoggedIn ? <StudentEditForm /> : <Navigate to="/login" />} />
                        <Route path=":teacherId/delete/:studentId" element={isLoggedIn ? <StudentDeleteCheck /> : <Navigate to="/login" />} />
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route >
            </Routes >
        </main >
    );
};
