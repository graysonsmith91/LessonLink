import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { me } from "../modules/authManager";
import { getTeacher } from "../modules/teacherManager";
import { getInstrumentsByTeacherId } from "../modules/instrumentManager";

export default function TeacherDetails() {
    const [teacher, setTeacher] = useState();
    const [instruments, setInstruments] = useState([]);
    const [user, setUser] = useState({});
    const { teacherId } = useParams();

    const getThisTeacher = () => {
        getTeacher(teacherId).then(teacher => setTeacher(teacher))
    }

    useEffect(() => {
        getThisTeacher();
        me().then(setUser);
        getInstrumentsByTeacherId(teacherId).then(instruments => setInstruments(instruments));
    }, []);

    if (!teacher) {
        return null;
    }

    // const handleTag = (evt) => {
    //     const postTag = {
    //         PostId: post.id,
    //         TagId: evt.target.value
    //     };

    //     addPostTag(postTag)
    //     getThisPost()

    // };

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

                                <em>
                                    <Link to="/teachers">Back to Teachers</Link>
                                </em>
                            </ div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}