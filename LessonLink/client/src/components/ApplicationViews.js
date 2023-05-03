import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Home";
import TeacherList from "./TeacherList";

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
                        <Route index element={<TeacherList />} />
                        {/* <Route path="add" element={<CategoryAddForm />} />
                        <Route path="edit/:categoryId" element={<CategoryEditForm />} />
                        <Route path="delete/:categoryId" element={<CategoryDeleteCheck />} /> */}
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route >
            </Routes >
        </main >
    );
};
