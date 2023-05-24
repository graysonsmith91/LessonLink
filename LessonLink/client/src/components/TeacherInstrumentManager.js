import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"


export default function TeacherInstrumentManager() {

    return (
        <Modal>
            <ModalHeader>Manage Instruments</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="dateTime">Date/Time:</Label>
                    <Input type="datetime-local" name="dateTime" id="dateTime" />
                </FormGroup>
                <FormGroup>
                    <Label for="lessonLength">Length (minutes):</Label>
                    <Input type="number" name="lessonLength" id="lessonLength" />
                </FormGroup>
                <FormGroup>
                    <Label for="note">Note:</Label>
                    <Input type="textarea" name="note" id="note" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary">Save</Button>
                <Button color="secondary">Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}