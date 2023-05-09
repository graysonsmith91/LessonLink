import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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

    const getStudents = () => {
        getStudentsByTeacherId(user.Id).then(students => {
            console.log(students);
            setStudents(students);
        });
    };

    //USERID IS messed up above


    useEffect(() => {
        me().then(setUser);
    }, []);

    // useEffect(() => {
    //     getStudents();
    // }, [user]);


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
        <Form>
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
                        {console.log(students, typeof students)}
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
        </Form>
    );
};