// class User {
//     constructor(user) {
//       this.id = user._id
//       this.email = user.email
//       this.firstName = user.firstName
//       this.lastName = user.lastName
//       this.username = `${user.firstName} ${user.lastName}`
//     }
//   }

class User { 
    constructor(user) {
      this.id = user._id
      this.email = user.email
      this.firstName = user.nickname
      this.username = user.name
      this.picture = user.picture
    }
}
      
  
  export default User;

// Example User From Auth0
//   {
//     email: "kamsci@gmail.com",
//     name: "kamsci@gmail.com",
//     nickname: "kamsci",
//     picture: "https://s.gravatar.com/avatar/8e378f2063eab85a1f55487feacab27a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fka.png",
//     ...
// }