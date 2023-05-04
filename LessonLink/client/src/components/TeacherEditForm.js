import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { editTeacher, getTeacher } from '../modules/teacherManager';


export default function TeacherEditForm() {
    const navigate = useNavigate();
    const { teacherId } = useParams();

    const [teacher, setTeacher] = useState({
        id: 0,
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
        getTeacher(teacherId).then(teacher => setTeacher(teacher));
    }, []);

    const handleChange = (e) => {
        const copy = { ...teacher };
        copy[e.target.id] = e.target.value;
        setTeacher(copy);
    }

    const editSubmit = (e) => {
        e.preventDefault();
        editTeacher(teacher)
            .then(() => navigate("/teachers"))
            .catch(() => alert("Something went wrong, try again"));
    };

    return (
        <Form onSubmit={(e) => editSubmit(e)}>
            <fieldset>
                <FormGroup>
                    <Label for='firstName'>First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        value={teacher.firstName}
                        onChange={(e) => handleChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='lastName'>Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        value={teacher.lastName}
                        onChange={(e) => handleChange(e)}
                    />
                </FormGroup>

                <FormGroup>
                    <Button color="success">Save</Button>
                </FormGroup>
                <em>
                    <Link to="..">Cancel</Link>
                </em>
            </fieldset>
        </Form>
    )
}