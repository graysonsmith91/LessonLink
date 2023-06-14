import { Button, Form, FormGroup, Label } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteStudent, getStudent } from '../modules/studentManager';

export default function StudentDeleteCheck({ userProfile }) {
    const navigate = useNavigate();
    const { studentId } = useParams();
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

    const deleteSubmit = (e) => {
        e.preventDefault();
        deleteStudent(studentId)
            .then(() => navigate(`/students/${userProfile.id}`))
            .catch(() => alert("Something went wrong, try again"));
    };

    return (
        <Form onSubmit={(e) => deleteSubmit(e)} className='form'>
            <fieldset>
                <legend>Delete Student?</legend>
                <FormGroup>
                    <div className="student-info">
                        <Label for='fullName' className='student-name'>{student.fullName}</Label>
                    </div>
                    <Button color="danger">Delete</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="cancel-btn" onClick={() => { navigate(`/students/${userProfile.id}`) }}>Cancel</Button>
                </FormGroup>
            </fieldset>
        </Form>
    )
}