import { Link, useNavigate } from "react-router-dom";

export default function Lesson({ lesson }) {
    const navigate = useNavigate();
    return (
        <tr key={lesson.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/lessons/details/${lesson.id}`)}>
            <td>{lesson.student.lastName}, {lesson.student.firstName}</td>
            <td>{(new Date(lesson?.dateTime)).toLocaleDateString('en-US', { timeZone: 'America/Chicago' })}</td>
            <td>{lesson.lessonLength}</td>
            <td></td>
            {/* <td className="text-end">
                <Link to={`Edit/${lesson.id}`} className="edit-button btn btn-outline-dark btn-sm">Edit</Link>
                <Link to={`Delete/${lesson.id}`} className="del-button btn btn-outline-danger btn-sm">Delete</Link>
            </td> */}
        </tr>
    );
}