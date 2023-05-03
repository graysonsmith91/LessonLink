import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { getAllTeachers } from "../modules/teacherManager";
import Teacher from "./Teacher";

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);

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
            </div>

            <Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Administrator</th>
                    </tr>

                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <Teacher teacher={teacher} key={teacher.id} />
                    ))}
                </tbody>
            </Table>
        </>
    );
}