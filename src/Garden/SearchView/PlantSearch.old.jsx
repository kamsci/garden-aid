import { Component } from "react";
import { Form, Button } from "react-bootstrap";

class PlantSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            capturedSearchTerm: '',
            loading: false,
            error: this.props.searchError
         }
         this.props.plantSearchClient == null && console.log('plantSearchClient is null');
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            capturedSearchTerm: event.target.value,
            error: null
        });
    }

    searchForPlants = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
            error: null
        });

        const { capturedSearchTerm } = this.state;
        const { setSearchPlants, plantSearchClient } = this.props

       plantSearchClient.search(capturedSearchTerm)
            .then(response => {
                console.log('API Search: ', response);
                setSearchPlants(capturedSearchTerm, response);
            })
            .catch(error => {
                console.log(error);
                this.setState({error: 'There was an error searching for plants. Please try again.'});
            })
            .finally(() => {
                this.setState({loading: false});
            });
    }

    render() {
        const pClass = this.state.error ? "read-the-docs-error" : "read-the-docs";
        return ( 
            <form onSubmit={this.searchForPlants}>
                <Form.Group style={{padding: 10}}>
                    <Form.Label>Find my plant: </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter plant name"
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
                <p className={pClass} style={{padding: 10}}>
                    {this.state.loading ? "Loading..." : 
                        this.state.error ? this.state.error : "Search for plants to add to your garden!" 
                    }
                </p>
            </form>
        );
    }
}

export default PlantSearch;