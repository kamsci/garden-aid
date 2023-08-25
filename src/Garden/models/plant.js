class Plant {
  constructor(plantData) {
    this.id = plantData.id
    this.imageUrl = plantData.image_url
    this.commonName = plantData.common_name
    this.scientificName = plantData.scientific_name
  }
}

export default Plant;