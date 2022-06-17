# Twiller
Twiller is a loose clone of a dimmed themed version of [Twitter](https://twitter.com/home). Twitter allows users to share and post their thoughts, pictures, and interact with others via follows, likes, comments, and replies.

Check out [Twiller](https://twiller.herokuapp.com/)

## Index

[MVP Feature List](https://github.com/AnthonyBronca/Twiller/wiki/mvp-feature-list) |
[Database Scheme](https://github.com/AnthonyBronca/Twiller/wiki/Twiller-DB-Schema) |
[User Stories](https://github.com/AnthonyBronca/Twiller/wiki/Twiller-user-stories) |
[Routes](https://github.com/AnthonyBronca/Twiller/wiki/front-end-routes)

## Sign Up
![Sign up feature](https://user-images.githubusercontent.com/95654116/174406138-47ed727b-bc10-4da8-a89e-7b10c0a783ca.png)


## Tweet Splash Page

![Tweet Splash Page](https://user-images.githubusercontent.com/95654116/174406351-02c8523b-f554-4818-be19-7198b624b663.png)



## Technologies Used

<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" height=40/><img src="https://camo.githubusercontent.com/a1b2dac5667822ee0d98ae6d799da61987fd1658dfeb4d2ca6e3c99b1535ebd8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f707974686f6e2d3336373041303f7374796c653d666f722d7468652d6261646765266c6f676f3d707974686f6e266c6f676f436f6c6f723d666664643534" height=40/><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" height=40 /><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" height=40/><img src="https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642" height=40/><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" height=40/><img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" height=40/><img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" height=40/><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height=40/> <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" height=40/>



## Getting started
1. Clone this repository:

   ```bash
   git clone https://github.com/AnthonyBronca/Twiller.git
   ```

2. Install dependencies with the following:

      ```bash
      npm install
      ```

3. Create a **.env** file using the **.envexample** provided 

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Create Database using the following commands:

  ```npx dotenv sequelize db:create```

   ```npx dotenv sequelize db:reset
   ```
   db:reset will create, migrate, and seed your database using scripts.

6. Now you can use the Demo User or Create an account



# Features 

## Users
* Guest users can create a new account

## Posts
* Users can create a post on Twiller with Words or Pictures
* Users can read/view other posts
* Users can update their posts
* Users can delete their posts

## Comment
* Users can create comments on posts
* users can read/view all of the comments on a post
* Users can delete their comments on a posts



## Future Features
### Following
Logged-in Users can
* Follow other users
* Be followed by other users

### Likes
Logged-in Users can
* Like tweets
* Like comments

### Profiles
Logged-in Users can
* view and edit their profile
* delete their profile
* view other peoples' profiles

### Retweets
Logged-in Users can
* Report other peoples' tweets as a quoted tweet to be shared to their followers

### Search
Logged-in Users can
* Search for other users and choosed to follow/unfollow
