import { Component } from "react";
import { Form } from "react-bootstrap";
import FormModal from "../../HelperComponents/FormModal";

class GardenFormModal extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const gardenDetails = {
            name: e.target.name.value,
            description: e.target.description.value,
        }
        this.props.submitGardenForm(gardenDetails);
        this.props.handleClose();
    }

    render() {
        return(
        <FormModal 
            title="Create New Garden" 
            onSubmit={this.handleSubmit}
            {...this.props}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Name of garden" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Desscription</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </FormModal>)
    }
}

export default GardenFormModal;