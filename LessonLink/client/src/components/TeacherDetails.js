import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacher } from "../modules/teacherManager";
import { getInstrumentsByTeacherId } from "../modules/instrumentManager";
import { Button } from "reactstrap";
import TeacherInstrumentManager from "./TeacherInstrumentManager";

export default function TeacherDetails() {
    const [teacher, setTeacher] = useState();
    const [instruments, setInstruments] = useState([]);
    const { teacherId } = useParams();
    const navigate = useNavigate();

    const getThisTeacher = () => {
        getTeacher(teacherId).then(teacher => setTeacher(teacher))
    }

    useEffect(() => {
        getThisTeacher();
        getInstrumentsByTeacherId(teacherId).then(instruments => setInstruments(instruments));
    }, []);

    if (!teacher) {
        return null;
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="card p-3 py-4">

                            <div className="text-center mt-3">
                                <h5 className="mt-2 mb-0">{teacher?.fullName}</h5>

                                <div className="px-4 mt-1">
                                    <p className="fonts">Teaching since: {(new Date(teacher?.dateCreated)).toLocaleDateString('en-US', { timeZone: 'America/Chicago' })}</p>
                                </div>

                                {
                                    instruments.length >= 1
                                        ?
                                        <div>
                                            <div>Instruments:</div>
                                            {
                                                instruments.map((instrument) => {
                                                    return (<div className="instrument-item" key={instrument.id}> {instrument.name} </div>)
                                                })}
                                        </div>
                                        :
                                        ""
                                }

                                <Button className="btn btn-sm m-1" onClick={() => { navigate(`/teachers`) }}>Back To All Teachers</Button>
                                {/* <Button className="btn btn-sm m-1" onClick={handleClick}>Manage Instruments</Button> */}
                            </ div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}