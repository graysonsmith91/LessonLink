import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { addTeacherInstrument, deleteTeacherInstrument, getAllInstruments } from "../modules/instrumentManager";


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

    const handleInstrumentSave = () => {
        const newInstrumentIds = teacherInstrumentIdArray.filter(
            (id) => !teacherInstruments.some((instrument) => instrument.id === id)
        );

        newInstrumentIds.forEach((instrumentId) => {
            const teacherInstrument = {
                teacherId: teacherId,
                instrumentId: instrumentId
            };

            addTeacherInstrument(teacherInstrument)
                .then((response) => {
                    // Handle successful addition if needed
                })
                .catch((error) => {
                    // Handle error if needed
                });
        });

        // TODO:
        // also loop through uncheckedInstrumentIds and delete each one

        onClose();
    };
    // TODO: still need to refresh but it's working to add instruments
    // when modal is closed refresh


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
                <Button color="primary" onClick={handleInstrumentSave}>
                    Save
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}