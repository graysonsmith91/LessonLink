import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { getStudentsByTeacherId } from '../../modules/studentManager';
import { addLesson } from '../../modules/lessonManager';
import moment from "moment/moment";

export default function LessonAddForm({ userProfile }) {
    const emptyLesson = {
        studentId: 0,
        teacherId: 0,
        lessonLength: "",
        startTime: "",
        endTime: "",
        note: "",
        isComplete: false
    };
    const [lesson, setLesson] = useState(emptyLesson);
    const [students, setStudents] = useState([]);
    const [studentDropdownText, setStudentDropdownText] = useState("Student");
    const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const toggleStudentDropdown = () => setStudentDropdownOpen((prevState) => !prevState);

    const location = useLocation();
    const { lessons } = location.state;
    // Have access to list of existing lessons using this
    // Can check to compare and prevent overlapping events

    useEffect(() => {
        getStudentsByTeacherId(userProfile.id).then((students) => {
            setStudents(students);
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

        if (key === "startTime" || key === "lessonLength") {
            const startTime = moment(lessonCopy.startTime);
            const lessonLength = parseInt(lessonCopy.lessonLength);

            if (!isNaN(startTime) && !isNaN(lessonLength)) {
                const endTime = startTime.clone().add(lessonLength, 'minutes');
                lessonCopy.endTime = endTime.format('YYYY-MM-DDTHH:mm');
            }
        }

        setLesson(lessonCopy);
    };

    const handleSave = (evt) => {
        lesson.teacherId = userProfile.id
        evt.preventDefault();
        addLesson(lesson).then(() => {
            navigate(`../${userProfile.id}`);
        });
    };

    return (
        <Form className='form'>
            <FormGroup>
                <Label for="startTime">Date/Time:</Label>
                <Input type="datetime-local" name="startTime" id="startTime" value={lesson.startTime} onChange={handleInputChange} />
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

            <button type="button" className="btn btn-outline-primary btn-md" onClick={handleSave}>Submit</button>
            <Link to={`/calendar/${userProfile.id}`} className="btn btn-outline-danger btn-md">
                Cancel
            </Link>
        </Form>
    );
};