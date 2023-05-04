import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { me } from '../modules/authManager';
import { addStudent } from '../modules/studentManager';

export default function StudentAddForm() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const emptyStudent = {
        firstName: '',
        lastName: '',
        guardianName: '',
        email: '',
        instrumentId: 0,
        teacherId: 0
    };

    const [student, setStudent] = useState(emptyStudent);
    const [instruments, setInstruments] = useState([])
    const [dropdownText, setDropdownText] = useState("Category")
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    useEffect(() => {
        me().then(setUser)
    }, []);

    // useEffect(() => {
    //     getInstruments();
    // }, []);

    const handleDropdown = (evt) => {
        setDropdownText(evt.target.name)
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
            navigate(`..`);
        });
    };

    return (
        <Form>
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

            {/* <FormGroup>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle color="primary" caret>{dropdownText}</DropdownToggle>
                    <DropdownMenu>
                        {instruments.map((instrument) => {
                            return (
                                <DropdownItem id="instrumentId" name={instrument.name} value={instrument.id} key={instrument.id}
                                    onClick={(e) => {
                                        handleDropdown(e);
                                        handleInputChange(e);
                                    }}>
                                    {instrument.name}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </FormGroup> */}

            <button className="btn btn-outline-primary btn-md" onClick={handleSave}>Submit</button>
        </Form>
    );
};