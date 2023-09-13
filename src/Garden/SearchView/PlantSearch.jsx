import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const PlantSearch = (props) => {
    const {searchError, plantSearchClient, setSearchPlants} = props;
    //hooks
    const [capturedSearchTerm, setCapturedSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(searchError);

    const handleInputChange = (event) => {
        event.preventDefault();
        setCapturedSearchTerm(event.target.value);
        setError(null);
    }

    const searchForPlants = (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        plantSearchClient.search(capturedSearchTerm)
        .then(response => {
            console.log('API Search: ', response);
            setSearchPlants(capturedSearchTerm,response);
        })
        .catch(error => {
            console.log(error);
            setError('There was an error searching for plants. Please try again.');
        })
        .finally(() => {
            setLoading(false);
        });
    };
            const pClass = error ? "read-the-docs-error" : "read-the-docs";
        return ( 
            <form onSubmit={searchForPlants}>
                <Form.Group style={{padding: 10}}>
                    <Form.Label>Find my plant: </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter plant name"
                        onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
                <p className={pClass} style={{padding: 10}}>
                    {loading ? "Loading..." : 
                        error ? error : "Search for plants to add to your garden!" 
                    }
                </p>
            </form>
        );
} 

export default PlantSearch;