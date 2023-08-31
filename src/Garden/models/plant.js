class Plant {
  constructor(plantData) {
    this.id = plantData.id
    this.imageUrls = plantData.imageUrls
    this.commonName = plantData.commonName
    this.scientificName = plantData.scientificName
  }
}

export default Plant;