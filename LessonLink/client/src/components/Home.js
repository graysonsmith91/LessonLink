import React, { useEffect, useState } from "react";
import { getStudentsByTeacherId } from "../modules/studentManager";
import { getLessonsByTeacherId } from "../modules/lessonManager";

export default function Home({ userProfile }) {
    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [filteredLessons, setFilteredLessons] = useState([]);

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const todayCheck = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    useEffect(() => {
        if (userProfile) {
            getStudentsByTeacherId(userProfile.id).then((students) => {
                setStudents(students);
            });
            getLessonsByTeacherId(userProfile.id).then((lessons) => {
                setLessons(lessons);
            });
        }
    }, [userProfile]);

    useEffect(() => {
        const filtered = lessons.length > 0 ? lessons.filter((lesson) => {
            if (!lesson.startTime) {
                return false;
            }
            const lessonDate = new Date(lesson.startTime);
            return lessonDate <= nextWeek && lessonDate >= todayCheck;
        }) : [];
        setFilteredLessons(filtered);
    }, [lessons]);


    return (
        <>
            <div style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: "35%",
                marginTop: "-0.5rem",
                textAlign: "center",
            }}>
                <span style={{ fontSize: "2rem" }}>Hello, {userProfile?.fullName}</span>
                <div style={{ fontSize: "1rem" }}>
                    <h1>Today is {today}</h1>
                </div>
                <div style={{ fontSize: "1.5rem" }}>Active Students: {students?.length}</div>
                <div style={{ fontSize: "1.5rem" }}>Lessons This Week: {filteredLessons?.length}</div>
            </div>
        </>
    );
}
