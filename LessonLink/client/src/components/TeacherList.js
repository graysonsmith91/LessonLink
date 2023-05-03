import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllTeachers } from "../modules/teacherManager";

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    const getTeachers = () => {
        getAllTeachers().then(teachers => setTeachers(teachers));
    };

    useEffect(() => {
        getTeachers();
    }, []);

    return (
        <>
            <div className="container-top">
                <h1>
                    Teachers
                </h1>
                <div className="new-button">
                    <button className="btn btn-outline-primary btn-lg" onClick={() => navigate(`/teachers/add`)}>Add New Teacher</button>
                </div>
            </div>

            <Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>

                </thead>
                <tbody>
                    {teachers.map((teacher) => {
                        return (
                            <tr key={teacher.id}>
                                <td>{teacher.fullName}</td>
                                <td className="text-end">
                                    <Link to={`Edit/${teacher.id}`} className="edit-button btn btn-outline-dark btn-sm">Edit</Link>
                                    <Link to={`Delete/${teacher.id}`} className="del-button btn btn-outline-danger btn-sm">Delete</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}