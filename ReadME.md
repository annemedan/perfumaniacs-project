````
# Project Name

<br>



## Description

Search platform for perfumes with 2 types of users, creating the favorite list for one and allowing the other to add/edit/delete.


<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - You'd be able to see a list of perfumes, but not search them or favourite. You'll be redirected to  log in and sign up on that page. 
- **sign up** - As a user I want to sign up on the web page as a regular user or as a store representative
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **edit pages** - As a store representative user I want to be able to edit the details of the perfumes and update avilability .
- **result** - As a user I want to see the list of perfumes filter by my preferences.
- **perfume listing** - As a user I want to see more details of the perfume, be able to call them and visit their website and save it as favorites.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/edit-perfume`            | Private route. Renders `edit-perfume` form view.             |                                                          |
| `PUT`      | `/private/edit-perfume`            | Private route. Sends edit-perfume info to server and updates user in DB. |  |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view for the regular user.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { --}                                 |
| `DELETE`   | `/private/favorites/:perfumeId` | Private route. Deletes the existing favorite from the store representative user. |                                                          |
| `GET`      | `/perfumes`                     | Renders `perfume-list` view.                              |                                                          |
| `GET`      | `/perfumes/details/:id`         | Renders `perfume-details` view for the particular perfume. |                                                          |







## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  store: Boolean,
  admin: Boolean, default: false,
  favorites: Array,
}

```

Perfumes model
```javascript
{
  name: String,
  manufacturer: String,
  fragrance type: String,
  stores: Array,
  image: String,
  //might try to add a comments section
}

```

Store model
```javascript
{
  name: [PerfumesName],
  price: Number
  size: Number,
  availability: Boolean,
}

```




<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

https://github.com/annemedan/perfumaniacs-project

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link]

### Contributors
Anne Dantas - [@annemedan](https://github.com/annemedan) - [LinkedIn](https://www.linkedin.com/in/username)
Joana Cruz - [@joanacruzwd](https://github.com/joanacruzwd) - [LinkedIn](https://www.linkedin.com/in/joana--cruz)
````