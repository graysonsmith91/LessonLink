import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Home";
import TeacherList from "./TeacherList";
import TeacherEditForm from "./TeacherEditForm";
import TeacherDeleteCheck from "./TeacherDeleteCheck";
import StudentList from "./StudentList";


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
                        <Route path="edit/:teacherId" element={<TeacherEditForm />} />
                        <Route path="delete/:teacherId" element={<TeacherDeleteCheck />} />
                    </Route>

                    <Route path="students/:teacherId">
                        <Route index element={isLoggedIn ? <StudentList /> : <Navigate to="/login" />} />
                        {/* <Route path="edit/:teacherId" element={<TeacherEditForm />} />
                        <Route path="delete/:teacherId" element={<TeacherDeleteCheck />} /> */}
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route >
            </Routes >
        </main >
    );
};
