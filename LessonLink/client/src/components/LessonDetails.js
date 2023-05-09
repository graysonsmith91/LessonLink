import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { me } from "../modules/authManager";
import { deleteLesson, getLesson } from "../modules/lessonManager";
import { Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from "reactstrap";
import { editLesson } from "../modules/lessonManager";

export default function LessonDetails() {
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [lesson, setLesson] = useState(null);

    const { teacherId } = useParams();
    const navigate = useNavigate();

    const getThisLesson = () => {
        getLesson(teacherId).then(lesson => setLesson(lesson))
    }

    useEffect(() => {
        getThisLesson();
        me().then(setUser);
    }, []);

    const handleEditOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleEditCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleEditLesson = () => {
        setIsModalOpen(false);
        editLesson(lesson).then(getThisLesson);
    }

    const handleDeleteOpenModal = () => {
        setIsDeleteModalOpen(true);
    }

    const handleDeleteCloseModal = () => {
        setIsDeleteModalOpen(false);
    }

    const handleDeleteConfirm = () => {
        deleteLesson(lesson.id)
            .then(() => navigate(`/lessons/${user.id}`))
            .catch(() => alert("Something went wrong, try again"));
    }

    const handleLessonComplete = () => {
        lesson.isComplete = true;
        editLesson(lesson)
            .then(() => navigate(`/lessons/${user.id}`))
            .catch(() => alert("Something went wrong, try again"));
    }

    const handleLessonIncomplete = () => {
        lesson.isComplete = false;
        editLesson(lesson)
            .then(() => navigate(`/lessons/${user.id}`))
            .catch(() => alert("Something went wrong, try again"));
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const lessonCopy = { ...lesson };
        lessonCopy[key] = value;
        setLesson(lessonCopy);
    };

    if (!lesson) {
        return null;
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="card p-3 py-4">

                            <div className="text-center mt-3">
                                <h5 className="mt-2 mb-0">{lesson?.student?.fullName}</h5>

                                <div className="px-4 mt-1">
                                    <p className="fonts">Date: {(new Date(lesson?.dateTime)).toLocaleDateString('en-US', { timeZone: 'America/Chicago' })}</p>
                                    <p>Notes: <br />{lesson.note}</p>
                                </div>

                                <FormGroup>
                                    <Button className="btn btn-sm m-1" onClick={() => { navigate(`/lessons/${user.id}`) }}>Back To All Lessons</Button>
                                    <Button className="btn btn-sm m-1" onClick={handleEditOpenModal}>Edit Lesson</Button>
                                    <Button className="btn btn-sm m-1" onClick={handleDeleteOpenModal}>Delete Lesson</Button>
                                </FormGroup>
                                <FormGroup>
                                    {lesson && new Date(lesson.dateTime) < new Date() && !lesson.isComplete && (
                                        <Button className="btn btn-sm" color="primary" onClick={handleLessonComplete}>Complete Lesson</Button>
                                    )}
                                    {lesson && new Date(lesson.dateTime) < new Date() && lesson.isComplete && (
                                        <Button className="btn btn-sm" color="danger" onClick={handleLessonIncomplete}>Incomplete Lesson</Button>
                                    )}
                                </FormGroup>

                            </ div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} toggle={handleEditCloseModal}>
                <ModalHeader toggle={handleEditCloseModal}>Edit Lesson</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="dateTime">Date/Time:</Label>
                        <Input type="datetime-local" name="dateTime" id="dateTime" value={lesson.dateTime} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lessonLength">Length (minutes):</Label>
                        <Input type="number" name="lessonLength" id="lessonLength" value={lesson.lessonLength} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="note">Note:</Label>
                        <Input type="textarea" name="note" id="note" value={lesson.note} onChange={handleInputChange} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditLesson}>Save</Button>
                    <Button color="secondary" onClick={handleEditCloseModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={isDeleteModalOpen}>
                <ModalHeader>Delete Confirmation</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this lesson?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteConfirm}>Delete</Button>
                    <Button color="secondary" onClick={handleDeleteCloseModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}