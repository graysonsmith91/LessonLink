import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import { getStudent } from "../../modules/studentManager";


export default function StudentDetails({ userProfile }) {
    const [student, setStudent] = useState(null);

    const { studentId } = useParams();
    const navigate = useNavigate();

    const getThisStudent = () => {
        getStudent(studentId).then(student => setStudent(student))
    }

    useEffect(() => {
        getThisStudent();
    }, []);

    // const handleDeleteConfirm = () => {
    //     deleteLesson(lesson.id)
    //         .then(() => navigate(`/lessons/${userProfile.id}`))
    //         .catch(() => alert("Something went wrong, try again"));
    // }

    // const handleInputChange = (evt) => {
    //     const value = evt.target.value;
    //     const key = evt.target.id;
    //     const lessonCopy = { ...lesson };
    //     lessonCopy[key] = value;
    //     setLesson(lessonCopy);
    // };

    if (!student) {
        return null;
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="card p-3 py-4">

                            <div className="text-center mt-3">
                                <h5 className="mt-2 mb-0">{student?.fullName}</h5>

                                <div className="px-4 mt-1">
                                    <p className="fonts">Instrument: {student?.instrument?.name}</p>
                                </div>

                                <FormGroup>
                                    <Button className="btn btn-sm m-1" onClick={() => { navigate(`/students/${userProfile.id}`) }}>Back To My Students</Button>
                                </FormGroup>

                            </ div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}