import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"


export default function TeacherInstrumentManager({ isModalOpen, teacherId, instruments, onClose }) {

    // need to get list of instruments by teacher id and set to checked using includes probably

    return (
        <Modal isOpen={isModalOpen} toggle={onClose}>
            <ModalHeader>Manage Instruments</ModalHeader>
            <ModalBody>
                {instruments.map((instrument) => (
                    <FormGroup key={instrument.id} check>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={instruments.includes(instrument.id)}
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