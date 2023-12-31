import { Form } from "react-bootstrap";
import FormModal from "../../HelperComponents/FormModal";

const GardenFormModal = (props) => {
     const {submitGardenForm, selectedUser, handleClose} = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        const gardenDetails = {
            name: e.target.name.value,
            description: e.target.description.value,
        }
        submitGardenForm(selectedUser._id, gardenDetails);
        handleClose();
    }
        return(
          <FormModal 
            title="Create New Garden" 
            onSubmit={handleSubmit}
            {...props}>
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

export default GardenFormModal;