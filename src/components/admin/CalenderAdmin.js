import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getAllLeaveRequests } from "../misc/LeaveRequestService"; // Import the API call

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch leave requests from the API
    const fetchEvents = async () => {
      try {
        const response = await getAllLeaveRequests();
        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          title: `${event.status} - ${event.user}`, // Combine status and user for the title
          start: event.startDate,
          end: event.endDate,
          description: event.reason, // Include reason as additional information
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo) => {
    alert(`Event: ${clickInfo.event.title}\nReason: ${clickInfo.event.extendedProps.description}`);
  };

  return (
    <div style={{ margin: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={handleEventClick} // Handle event click
        editable={false} // Disable drag-and-drop for now
      />
    </div>
  );
};

export default CalendarComponent;
