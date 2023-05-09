import { Button, Form, FormGroup, Label } from 'reactstrap';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteTeacher, getTeacher } from '../modules/teacherManager';

export default function TeacherDeleteCheck() {
    const navigate = useNavigate();
    const { teacherId } = useParams();

    const [teacher, setTeacher] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        getTeacher(teacherId).then(teacher => setTeacher(teacher));
    }, []);

    const deleteSubmit = (e) => {
        e.preventDefault();
        deleteTeacher(teacherId)
            .then(() => navigate("/teachers"))
            .catch(() => alert("Something went wrong, try again"));
    };

    return (
        <Form onSubmit={(e) => deleteSubmit(e)} className='form'>
            <fieldset>
                <h2>Delete Teacher?</h2>
                <FormGroup>
                    <div>
                        <Label for='fullName'>{teacher.fullName}</Label>
                    </div>
                    <Button color="danger">Delete</Button>
                </FormGroup>
                <em>
                    <Link to="/teachers">Cancel</Link>
                </em>
            </fieldset>
        </Form>
    )
}