import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonsByTeacherId } from "../modules/lessonManager";
import Lesson from "./Lesson";

export default function LessonList() {
    const [lessons, setLessons] = useState([]);
    const { teacherId } = useParams();
    const navigate = useNavigate();

    const getLessons = () => {
        getLessonsByTeacherId(teacherId).then(lessons => setLessons(lessons));
    };

    useEffect(() => {
        getLessons();
    }, []);

    return (
        <>
            <div className="container-top">
                <h1>
                    My Lessons
                </h1>
                <div className="new-button">
                    <button className="btn btn-outline-primary btn-md" onClick={() => navigate(`/lessons/add`)}>Add New Lesson</button>
                </div>
            </div>
            <h4>Upcoming lessons</h4>

            <Table hover>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Length (Minutes)</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {lessons
                        .filter((lesson) => new Date(lesson.dateTime) > new Date())
                        .map((lesson) => (
                            <Lesson lesson={lesson} key={lesson.id} />
                        ))}
                </tbody>
            </Table>

            <h4>Incomplete lessons</h4>
            <Table hover>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Length (Minutes)</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {lessons
                        .filter((lesson) => new Date(lesson.dateTime) < new Date() && lesson.isComplete === false)
                        .map((lesson) => (
                            <Lesson lesson={lesson} key={lesson.id} />
                        ))}
                </tbody>
            </Table>


            <h4>Complete lessons</h4>
            <Table hover>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Length (Minutes)</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {lessons
                        .filter((lesson) => new Date(lesson.dateTime) < new Date() && lesson.isComplete === true)
                        .map((lesson) => (
                            <Lesson lesson={lesson} key={lesson.id} />
                        ))}
                </tbody>
            </Table>
        </>
    );
}