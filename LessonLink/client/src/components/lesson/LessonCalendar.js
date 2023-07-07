import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonsByTeacherId } from "../../modules/lessonManager";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function LessonCalendar() {
    const [lessons, setLessons] = useState([]);
    const [events, setEvents] = useState([]);
    const { teacherId } = useParams();
    const navigate = useNavigate();

    const getLessons = () => {
        getLessonsByTeacherId(teacherId).then(lessons => setLessons(lessons));
    };

    useEffect(() => {
        getLessons();
    }, []);

    useEffect(() => {
        getCalendarEvents();
    }, [lessons])

    const getCalendarEvents = () => {
        const eventsArray = [];
        for (const lesson of lessons) {
            const eventObject = {
                id: lesson.id,
                title: `${lesson.student.fullName}`,
                start: `${lesson.startTime}`,
                end: `${lesson.endTime}`
            };
            eventsArray.push(eventObject);
        }
        setEvents(eventsArray);
    };

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
                    height={"80vh"}
                    slotMinTime="9:00:00"
                    slotMaxTime="20:00:00"
                    events={events}
                    nowIndicator={true}
                />
            </div>
        </>
    );
}