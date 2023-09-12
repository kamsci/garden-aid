import { Card } from "react-bootstrap";

const PlantCard = (props) => {

    const {plant, children} = props;

    
    const getImageUrl = (imageUrls) => {
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
    const image = getImageUrl(plant.imageUrls);

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


export default PlantCard;