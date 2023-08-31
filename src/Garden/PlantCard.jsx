import { Component } from "react";
import { Card } from "react-bootstrap";

class PlantCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { plant, children } = this.props;
        const image = this.getImageUrl(plant.imageUrls);
        return (
            <Card id={plant.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image}/>
                <Card.Body>
                    <Card.Title>{plant.commonName}</Card.Title>
                    <Card.Text>
                        {plant.scientificName}
                    </Card.Text>
                    {children}
                </Card.Body>
            </Card>
        );
    }

    getImageUrl(imageUrls) {
        if (!imageUrls) return '';
        if (imageUrls.hasOwnProperty('thumbnailUrl')) {
            return imageUrls.thumbnailUrl;
        } else if (imageUrls.hasOwnProperty('smallUrl')) {
            return imageUrls.smallUrl;
        } else if (imageUrls.hasOwnProperty('defaultlUrl')) {
            return imageUrls.defaultlUrl;
        } else {
            return '';
        }
    }
}

export default PlantCard;