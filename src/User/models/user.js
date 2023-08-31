class User {
    constructor(user) {
      this.id = user._id
      this.email = user.email
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.username = `${user.firstName} ${user.lastName}`
    }
  }
  
  export default User;