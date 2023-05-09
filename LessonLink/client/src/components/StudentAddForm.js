import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { me } from '../modules/authManager';
import { addStudent } from '../modules/studentManager';
import { getAllInstruments } from '../modules/instrumentManager';
import { getAllTeachers } from '../modules/teacherManager';

export default function StudentAddForm() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const emptyStudent = {
        firstName: '',
        lastName: '',
        guardianName: '',
        email: '',
        instrumentId: 1,
        teacherId: 1
    };

    const [student, setStudent] = useState(emptyStudent);
    const [instruments, setInstruments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [instrumentDropdownText, setInstrumentDropdownText] = useState("Instrument");
    const [teacherDropdownText, setTeacherDropdownText] = useState("Teacher");
    const [instrumentDropdownOpen, setInstrumentDropdownOpen] = useState(false);
    const [teacherDropdownOpen, setTeacherDropdownOpen] = useState(false);

    const toggleInstrumentDropdown = () => setInstrumentDropdownOpen((prevState) => !prevState);
    const toggleTeacherDropdown = () => setTeacherDropdownOpen((prevState) => !prevState);

    const getInstruments = () => {
        getAllInstruments().then(instruments => setInstruments(instruments));
    }

    const getTeachers = () => {
        getAllTeachers().then(teachers => setTeachers(teachers));
    }

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


    const handleSave = (evt) => {
        evt.preventDefault();
        addStudent(student).then(() => {
            navigate(`../${user.id}`);
        });
    };

    return (
        <Form className='form'>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input type="text" name="firstName" id="firstName"
                    value={student.firstName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input type="text" name="lastName" id="lastName"
                    value={student.lastName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="guardianName">Guardian Name</Label>
                <Input type="text" name="guardianName" id="guardianName"
                    value={student.guardianName}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email"
                    value={student.email}
                    onChange={handleInputChange} />
            </FormGroup>

            <FormGroup>
                <Dropdown isOpen={instrumentDropdownOpen} toggle={toggleInstrumentDropdown} >
                    <DropdownToggle color="primary" caret>{instrumentDropdownText}</DropdownToggle>
                    <DropdownMenu>
                        {instruments.map((instrument) => {
                            return (
                                <DropdownItem id="instrumentId" name={instrument.name} value={instrument.id} key={instrument.id}
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
                                <DropdownItem id="teacherId" name={teacher.fullName} value={teacher.id} key={teacher.id}
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

            <button className="btn btn-outline-primary btn-md" onClick={handleSave}>Submit</button>
            <button className="btn btn-outline-danger btn-md" onClick={() => { navigate(`/students/${user.id}`) }}>Cancel</button>
        </Form>
    );
};