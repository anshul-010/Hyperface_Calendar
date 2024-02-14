import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { calendarEvents } from "../db";
import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Box,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyCalendar = () => {
  const [events, setEvents] = useState(calendarEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((item) =>
      item.id === event.id
        ? {
            ...item,
            start,
            end,
          }
        : item
    );

    setEvents(updatedEvents);
  };

  return (
    <Box>
      <Center>
        <Heading color="#530429db" size={{ lg: "lg", base: "lg" }} m={4}>
          Hyperface Calendar
        </Heading>
      </Center>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
        selectable
        resizable
        onEventDrop={handleEventDrop}
      />
      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Event Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Type: {selectedEvent.type}</Text>
              <Text>{selectedEvent.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default MyCalendar;
