import { Link } from "react-router-dom";

export default function Teacher({ teacher }) {
    return (
        <tr key={teacher.id}>
            <td>{teacher.fullName}</td>
            <td>{teacher.email}</td>
            <td>{teacher.phone}</td>
            <td>{teacher.userTypeId === 1 ? "✔️" : ""}</td>
            <td className="text-end">
                <Link to={`Edit/${teacher.id}`} className="edit-button btn btn-outline-dark btn-sm">Edit</Link>
                <Link to={`Delete/${teacher.id}`} className="del-button btn btn-outline-danger btn-sm">Delete</Link>
            </td>
        </tr>
    );
}