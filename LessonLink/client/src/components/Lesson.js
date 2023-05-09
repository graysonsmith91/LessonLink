import { Link, useNavigate } from "react-router-dom";

export default function Lesson({ lesson }) {
    const navigate = useNavigate();
    return (
        <tr key={lesson.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/lessons/details/${lesson.id}`)}>
            <td>{lesson.student.lastName}, {lesson.student.firstName}</td>
            <td>{(new Date(lesson?.dateTime)).toLocaleDateString('en-US', { timeZone: 'America/Chicago' })}</td>
            <td>{lesson.lessonLength}</td>
            <td></td>
        </tr>
    );
}