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
        let instrumentArray = [];
        for (const teacherInstrument of teacherInstruments) {
            instrumentArray.push(teacherInstrument.id);
        }
        return instrumentArray;
    }

    useEffect(() => {
        getInstruments();
        setTeacherInstrumentIdArray(getTeacherInstrumentIds());
    }, []);

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
                            // onChange={() => handleInstrumentChange(instrument.id)}
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