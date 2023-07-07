import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonsByTeacherId } from "../../modules/lessonManager";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function LessonCalendar() {
    const [lessons, setLessons] = useState([]);
    const { teacherId } = useParams();
    const navigate = useNavigate();

    const getLessons = () => {
        getLessonsByTeacherId(teacherId).then(lessons => setLessons(lessons));
    };

    useEffect(() => {
        getLessons();
    }, []);

    return (
        <>
            <div className="calendar-container">
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    height={"70vh"}
                    dayMinWidth={"50vw"}
                />
            </div>
        </>
    );
}