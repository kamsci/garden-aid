import { Component } from "react";
import { Row, Form, Button } from "react-bootstrap";
import axios from "axios";

const basePlantUrl = "http://localhost:3000";
const plantSearchUrl = `${basePlantUrl}/search`;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// const headers = {
//     "Access-Control-Allow-Origin": '*',
// };

class PlantSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchTerm: '',
            loading: false,
            error: null
         }
    }

    setPlantSearchTerm = (event) => {
        this.setState({
            searchTerm: event.target.value,
            error: null
        });
    }

    searchForPlants = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
            error: null
        });

        const { setSearchPlants } = this.props

        axios.get(plantSearchUrl + "?q=" + this.state.searchTerm, {
                headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // 'Access-Control-Allow-Origin': '*' // Could work and fix the previous problem, but not in all APIs
                }
            })
            .then(response => {
                console.log(response.data.data);
                setSearchPlants(response.data.data);
            })
            .catch(error => {
                this.setState({error: error.response.data});
                console.log(error);
            })
            .finally(() => {
                this.setState({loading: false});
            });
    }

    render() {
        return ( 
            <form onSubmit={this.searchForPlants}>
                <Form.Group style={{padding: 10}}>
                    <Form.Label>Find my plant: </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter plant name"
                        onChange={this.setPlantSearchTerm} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
                <p className="read-the-docs" style={{padding: 10}}>
                    {this.state.loading ? "Loading..." : 
                        this.state.error ? this.state.error : "Search for plants to add to your garden!" 
                    }
                </p>
            </form>
        );
    }
}

export default PlantSearch;