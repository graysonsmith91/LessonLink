import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { getStudentsByTeacherId } from "../../modules/studentManager";
import { useNavigate, useParams } from "react-router-dom";
import Student from "./Student";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const { teacherId } = useParams();
    const navigate = useNavigate();

    const getStudents = () => {
        getStudentsByTeacherId(teacherId).then(students => setStudents(students));
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <>
            <div className="container-top">
                <h1>
                    My Students
                </h1>
                <div className="new-button">
                    <button className="btn btn-outline-primary btn-md" onClick={() => navigate(`/students/add`)}>Add New Student</button>
                </div>
            </div>

            <Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Family</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {students.map((student) => (
                        <Student student={student} key={student.id} />
                    ))}
                </tbody>
            </Table>
        </>
    );
}