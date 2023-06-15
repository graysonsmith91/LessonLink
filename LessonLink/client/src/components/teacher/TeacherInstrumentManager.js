import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { addTeacherInstrument, deleteTeacherInstrument, getAllInstruments } from "../../modules/instrumentManager";


export default function TeacherInstrumentManager({ isModalOpen, teacherId, teacherInstruments, onClose, setTeacherInstruments, fetchInstruments }) {
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
        // This checks for duplicates
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
                    const updatedInstruments = [...teacherInstruments, response.data];
                    setTeacherInstruments(updatedInstruments);
                    fetchInstruments();
                })
                .catch((error) => {
                    console.error('Error occurred while adding the teacher instrument:', error);
                });
        });

        uncheckedInstrumentIds.forEach((instrumentId) => {
            deleteTeacherInstrument(teacherId, instrumentId)
                .then((response) => {
                    fetchInstruments();
                })
                .catch((error) => {
                    console.error('Error occurred while deleting the teacher instrument:', error);
                });
        });

        onClose();
    };

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