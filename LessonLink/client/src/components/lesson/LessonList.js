import { useState, useEffect } from "react";

import { Row, Col, Table } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";

import Lesson from "./Lesson";
import { getLessonsByTeacherId } from "../../modules/lessonManager";

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
            <div className="lesson-container">
                <div>
                    <h1>
                        My Lessons
                    </h1>
                    <div className="new-button">
                        <button className="btn btn-outline-primary btn-md" onClick={() => navigate(`/lessons/add`)}>Add New Lesson</button>
                    </div>
                </div>

                <div className="lesson-section">
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
                </div>

                <Row >
                    <Col md="6" className="lesson-section incomplete-lessons">
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
                    </Col>
                    <Col md="6" className="lesson-section complete-lessons">
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
                    </Col>
                </Row>
            </div>
        </>
    );
}