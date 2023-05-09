import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { me } from '../modules/authManager';
import { getStudentsByTeacherId } from '../modules/studentManager';
import { addLesson } from '../modules/lessonManager';

export default function LessonAddForm() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const emptyLesson = {
        studentId: 0,
        teacherId: 0,
        lessonLength: "",
        dateTime: "",
        note: "",
        isComplete: false
    };

    const [lesson, setLesson] = useState(emptyLesson);
    const [students, setStudents] = useState([]);
    const [studentDropdownText, setStudentDropdownText] = useState("Student");
    const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

    const toggleStudentDropdown = () => setStudentDropdownOpen((prevState) => !prevState);

    useEffect(() => {
        me().then((user) => {
            setUser(user);
            getStudentsByTeacherId(user.id).then((students) => {
                setStudents(students);
            });
        });
    }, []);

    const handleStudentDropdown = (evt) => {
        setStudentDropdownText(evt.target.name)
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const lessonCopy = { ...lesson };
        lessonCopy[key] = value;
        setLesson(lessonCopy);
    };


    const handleSave = (evt) => {
        lesson.teacherId = user.id
        evt.preventDefault();
        addLesson(lesson).then(() => {
            navigate(`../${user.id}`);
        });
    };

    return (
        <Form className='form'>
            <FormGroup>
                <Label for="dateTime">Date/Time:</Label>
                <Input type="datetime-local" name="dateTime" id="dateTime" value={lesson.dateTime} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="lessonLength">Length (In Minutes)</Label>
                <Input type="text" name="lessonLength" id="lessonLength"
                    value={lesson.lessonLength}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="note">Note</Label>
                <Input type="text" name="note" id="note"
                    value={lesson.note}
                    onChange={handleInputChange} />
            </FormGroup>

            <FormGroup>
                <Dropdown isOpen={studentDropdownOpen} toggle={toggleStudentDropdown} >
                    <DropdownToggle color="primary" caret>{studentDropdownText}</DropdownToggle>
                    <DropdownMenu>
                        {students.map((student) => {
                            return (
                                <DropdownItem id="studentId" name={student.fullName} value={student.id} key={student.id}
                                    onClick={(e) => {
                                        handleStudentDropdown(e);
                                        handleInputChange(e);
                                    }}>
                                    {student.fullName}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </FormGroup>

            <button className="btn btn-outline-primary btn-md" onClick={handleSave}>Submit</button>
            <button className="btn btn-outline-danger btn-md" onClick={() => { navigate(`/lessons/${user.id}`) }}>Cancel</button>
        </Form>
    );
};