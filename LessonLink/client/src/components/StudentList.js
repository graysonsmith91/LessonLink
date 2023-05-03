import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { getStudentsByTeacherId } from "../modules/studentManager";
import { useParams } from "react-router-dom";
import Student from "./Student";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const { teacherId } = useParams();

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
            </div>

            <Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Family</th>
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