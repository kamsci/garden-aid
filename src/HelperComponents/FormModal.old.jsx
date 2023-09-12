import { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class FormModal extends Component {

    render() {
        const { 
            title,
            show, 
            handleClose, 
            handleShow, 
            onSubmit,
            children 
        } = this.props;
        return (
            <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close without saving
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            </>
        );
    }
}

export default FormModal;