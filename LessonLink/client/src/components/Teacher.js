import { Link, useNavigate } from "react-router-dom";

export default function Teacher({ teacher }) {
    const navigate = useNavigate();
    return (
        <tr key={teacher.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/teachers/details/${teacher.id}`)}>
            <td>{teacher.fullName}</td>
            <td>{teacher.email}</td>
            <td>{teacher.phone}</td>
            <td>{teacher.userTypeId === 1 ? "✔️" : ""}</td>
            <td className="text-end">
                <Link to={`Edit/${teacher.id}`} className="edit-button btn btn-outline-dark btn-sm" onClick={(e) => e.stopPropagation()}>Edit</Link>
                <Link to={`Delete/${teacher.id}`} className="del-button btn btn-outline-danger btn-sm" onClick={(e) => e.stopPropagation()}>Delete</Link>
            </td>
        </tr>
    );
}