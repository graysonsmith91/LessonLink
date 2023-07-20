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

    const currentDate = new Date();

    const getCalendarEvents = () => {
        const eventsArray = [];
        for (const lesson of lessons) {
            const eventObject = {
                id: lesson.id,
                title: `${lesson.student.fullName}`,
                start: `${lesson.startTime}`,
                end: `${lesson.endTime}`,
                isComplete: lesson.isComplete,
            };

            if (new Date(lesson.endTime) <= currentDate) {
                eventObject.classNames = lesson.isComplete ? "event-complete" : "event-incomplete";
            };

            eventsArray.push(eventObject);
        }
        setEvents(eventsArray);
    };

    const handleAddLesson = () => {
        navigate("/calendar/add", { state: { lessons: lessons } });
    }

    const handleEventClick = (eventInfo) => {
        const lessonId = eventInfo.event.id;
        navigate(`/calendar/details/${lessonId}`);
    }

    return (
        <>
            <div className="calendar-container">

                <div className="new-button">
                    <button
                        className="btn btn-outline-primary btn-md"
                        onClick={handleAddLesson}>Add New Lesson</button>
                </div>

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
                    eventClick={handleEventClick}
                    eventClassNames="event-pointer"
                />
            </div>
        </>
    );
}