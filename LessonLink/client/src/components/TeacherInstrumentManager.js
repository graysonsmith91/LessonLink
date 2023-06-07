import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getAllInstruments } from "../modules/instrumentManager";


export default function TeacherInstrumentManager({ isModalOpen, teacherId, teacherInstruments, onClose }) {
    const [allInstruments, setAllInstruments] = useState([]);
    const [teacherInstrumentIdArray, setTeacherInstrumentIdArray] = useState([]);
    const [uncheckedInstrumentIds, setUncheckedInstrumentIds] = useState([]);

    const getInstruments = () => {
        getAllInstruments().then(instruments => setAllInstruments(instruments));
    }

    const getTeacherInstrumentIds = () => {
        let instrumentIdArray = [];
        for (const teacherInstrument of teacherInstruments) {
            instrumentIdArray.push(teacherInstrument.id);
        }
        return instrumentIdArray;
    }

    useEffect(() => {
        getInstruments();
        setTeacherInstrumentIdArray(getTeacherInstrumentIds());
    }, []);

    const handleInstrumentChange = (instrumentId, isChecked) => {
        if (isChecked) {
            setTeacherInstrumentIdArray(prevIds => [...prevIds, instrumentId]);
            setUncheckedInstrumentIds(prevIds => prevIds.filter(id => id !== instrumentId));
        } else {
            setTeacherInstrumentIdArray(prevIds => prevIds.filter(id => id !== instrumentId));

            if (!uncheckedInstrumentIds.includes(instrumentId)) {
                setUncheckedInstrumentIds(prevIds => [...prevIds, instrumentId]);
            }
        }
    };

    const handleInstrumentSave = async () => {
        try {
            for (const instrumentId of teacherInstrumentIdArray) {
                if (!uncheckedInstrumentIds.includes(instrumentId)) {
                    // Add new TeacherInstrument to the database
                    // need function on instrumentmanager

                    const teacherInstrument = { instrumentId: instrumentId, teacherId: teacherId };
                    //await addTeacherInstrument(teacherInstrument); //TODO: Add these functions
                } else {
                    // Delete existing TeacherInstrument from the database
                    //await deleteTeacherInstrument(teacherId, instrumentId); //TODO: Add these functions
                }
            }
            onClose(); // Close the modal or perform other actions
        } catch (error) {
            console.error("Error occurred while saving teacher instruments:", error);
        }
    }

    // for each id in the array when saved, create an object with the instrument.id or value and teacherId and add to database

    return (
        <Modal isOpen={isModalOpen} toggle={onClose}>
            <ModalHeader>Manage Instruments</ModalHeader>
            <ModalBody>
                {allInstruments.map((instrument) => (
                    <FormGroup key={instrument.id} check>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={teacherInstrumentIdArray.includes(instrument.id)}
                                onChange={(event) => handleInstrumentChange(instrument.id, event.target.checked)}
                            />
                            {instrument.name}
                        </Label>
                    </FormGroup>
                ))}
            </ModalBody>
            <ModalFooter>
                <Button color="primary">
                    Save
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}