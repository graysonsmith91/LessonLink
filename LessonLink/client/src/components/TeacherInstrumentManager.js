import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getAllInstruments } from "../modules/instrumentManager";


export default function TeacherInstrumentManager({ isModalOpen, teacherId, teacherInstruments, onClose }) {
    const [allInstruments, setAllInstruments] = useState([]);
    const [teacherInstrumentIdArray, setTeacherInstrumentIdArray] = useState([]);

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
        } else {
            setTeacherInstrumentIdArray(prevIds => prevIds.filter(id => id !== instrumentId));
        }
    };

    const handleInstrumentSave = () => {

    }

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