import { Button, Form, FormGroup, Label } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteStudent, getStudent } from '../modules/studentManager';
import { me } from '../modules/authManager';

export default function StudentDeleteCheck() {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const [user, setUser] = useState(null);
    const [student, setStudent] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        instrumentId: 0,
        teacherId: 0
    });

    useEffect(() => {
        getStudent(studentId).then(student => setStudent(student));
    }, []);

    useEffect(() => {
        me().then(setUser)
    }, []);

    const deleteSubmit = (e) => {
        e.preventDefault();
        deleteStudent(studentId)
            .then(() => navigate(`/students/${user.id}`))
            .catch(() => alert("Something went wrong, try again"));
    };

    return (
        <Form onSubmit={(e) => deleteSubmit(e)}>
            <fieldset>
                <h2>Delete Student?</h2>
                <FormGroup>
                    <div>
                        <Label for='fullName'>{student.fullName}</Label>
                    </div>
                    <Button color="danger">Delete</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="btn btn-md" onClick={() => { navigate(`/students/${user.id}`) }}>Cancel</Button>
                </FormGroup>
            </fieldset>
        </Form>
    )
}