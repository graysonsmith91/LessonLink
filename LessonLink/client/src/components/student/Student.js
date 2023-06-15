import { Link } from "react-router-dom";

export default function Student({ student }) {
    return (
        <tr key={student.id}>
            <td>{student.lastName}, {student.firstName}</td>
            <td>{student.email}</td>
            <td>{student.guardianName}</td>
            <td className="text-end">
                <Link to={`Edit/${student.id}`} className="edit-button btn btn-outline-dark btn-sm">Edit</Link>
                <Link to={`Delete/${student.id}`} className="del-button btn btn-outline-danger btn-sm">Delete</Link>
            </td>
        </tr>
    );
}