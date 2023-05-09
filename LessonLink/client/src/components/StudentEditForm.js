import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { editStudent, getStudent } from '../modules/studentManager';
import { getAllInstruments } from '../modules/instrumentManager';
import { getAllTeachers } from '../modules/teacherManager';
import { me } from '../modules/authManager';


export default function StudentEditForm() {
    const [user, setUser] = useState(null);
    const [instruments, setInstruments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [instrumentDropdownText, setInstrumentDropdownText] = useState("Instrument");
    const [teacherDropdownText, setTeacherDropdownText] = useState("Teacher");
    const [instrumentDropdownOpen, setInstrumentDropdownOpen] = useState(false);
    const [teacherDropdownOpen, setTeacherDropdownOpen] = useState(false);
    const [student, setStudent] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        instrumentId: 0,
        teacherId: 0
    });

    const navigate = useNavigate();
    const { studentId } = useParams();


    const toggleInstrumentDropdown = () => setInstrumentDropdownOpen((prevState) => !prevState);
    const toggleTeacherDropdown = () => setTeacherDropdownOpen((prevState) => !prevState);


    const getInstruments = () => {
        getAllInstruments().then(instruments => setInstruments(instruments));
    }

    const getTeachers = () => {
        getAllTeachers().then(teachers => setTeachers(teachers));
    }


    useEffect(() => {
        getStudent(studentId).then(student => setStudent(student));
    }, []);

    useEffect(() => {
        me().then(setUser)
    }, []);

    useEffect(() => {
        getInstruments();
        getTeachers();
    }, []);


    const handleInstrumentDropdown = (evt) => {
        setInstrumentDropdownText(evt.target.name)
    }

    const handleTeacherDropdown = (evt) => {
        setTeacherDropdownText(evt.target.name)
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const studentCopy = { ...student };
        studentCopy[key] = value;
        setStudent(studentCopy);
    };

    const handleSave = (e) => {
        e.preventDefault();
        editStudent(student)
            .then(() => navigate(`/students/${user.id}`))
            .catch(() => alert("Something went wrong, try again"));
    };

    return (
        <Form className='form'>
            <fieldset>
                <FormGroup>
                    <Label for='firstName'>First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={student.firstName || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='lastName'>Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={student.lastName || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='guardianName'>Guardian Name</Label>
                    <Input
                        id="guardianName"
                        type="text"
                        name="guardianName"
                        value={student.guardianName || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input
                        id="email"
                        type="text"
                        name="email"
                        value={student.email || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                </FormGroup>

                <FormGroup>
                    <Dropdown isOpen={instrumentDropdownOpen} toggle={toggleInstrumentDropdown} >
                        <DropdownToggle color="primary" caret>{instrumentDropdownText}</DropdownToggle>
                        <DropdownMenu>
                            {instruments.map((instrument) => {
                                return (
                                    <DropdownItem id="instrumentId" name={instrument.name} value={instrument.id || ''} key={instrument.id}
                                        onClick={(e) => {
                                            handleInstrumentDropdown(e);
                                            handleInputChange(e);
                                        }}>
                                        {instrument.name}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>

                <FormGroup>
                    <Dropdown isOpen={teacherDropdownOpen} toggle={toggleTeacherDropdown} >
                        <DropdownToggle color="primary" caret>{teacherDropdownText}</DropdownToggle>
                        <DropdownMenu>
                            {teachers.map((teacher) => {
                                return (
                                    <DropdownItem id="teacherId" name={teacher.fullName} value={teacher.id || ''} key={teacher.id}
                                        onClick={(e) => {
                                            handleTeacherDropdown(e);
                                            handleInputChange(e);
                                        }}>
                                        {teacher.fullName}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>

                <FormGroup>
                    <Button color="success" onClick={handleSave}>Save</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="btn btn-md" onClick={() => { navigate(`/students/${user.id}`) }}>Cancel</Button>
                </FormGroup>
            </fieldset>
        </Form>
    )
}