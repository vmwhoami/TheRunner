# The The Runner

## Game Development using Phaser 3, Webpack, and ES6.

> JavaScript Curriculum Final Project @Microverse

Implementation of an Adventure Game built with the [Phaser 3](https://phaser.io/phaser3) framework.

In this project, I utilize the Phaser 3 framework to build an endless runner game. It is a game in which you need to survive without falling off the platforms while also skipping fire. The player acquires points by collecting coins.
I used local storage to persist in the player score.
I also used the Leaderboard API to post the player's score, displaying the top 10 players on the leaderboard scene.

### How to Play

You need to jump from one platform to another. To jump, either press space, or click with the left button in your mouse. Your score increases with time, and every coin is worth 10 points.

![screenshot](./gameplay.gif)

## Video Presentation

[YouTube Link](https://www.youtube.com/)

## Built With

- HTML5/CSS
- Phaser 3
- Webpack
- Javascript
- Eslint
- Babel
- Jest for testing
- [Netlify](https://www.netlify.com/) for deployment
- [Leaderboard API service](https://www.notion.so/Leaderboard-API-service-24c0c3c116974ac49488d4eb0267ade3) for high scores

## Live Demo

[Play Game on Live Link](https://therunner.netlify.app/)

## Using This Project

1. Make a directory somewhere in your file system where you want to keep your project.
2. `cd` into that directory from the command line.
3. Clone this project with `git clone https://github.com/vmwhoami/TheRunner`.
4. `cd` to TheRunner

## Installing Dependencies

1. From the cloned project's directory, run `npm install`.

## Running The Project

- Clone the project to your local machine;
- `cd` into the project directory;
- Run `npm install` to install the necessary modules;
- To check in development mode, run `npm start`, the page will automatically load on [localhost:3000](localhost:3000).

## Testing

Jest, a JavaScript testing framework was used for testing to ensure correctness of any JavaScript codebase.
To run the test use: `npm test`

## Building The Project

To host the project on external server like netlify, you will need to run the webpack build command:
`npm run build`

## Author

**Vitalie Melnic**

- Github: [@vmwhoami](https://github.com/vmwhoami/)
- Twitter: [@vmwhoami](https://twitter.com/vmwhoami)
- Linkedin: [vitalie-melnic](https://www.linkedin.com/in/vitalie-melnic/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/vmwhoami/TheRunner/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- [Microverse](https://www.microverse.org/)
- [Phaser](https://phaser.io/)
- [OpenGameArt](https://opengameart.org/)
- [Code Academy](https://www.codecademy.com/learn/learn-phaser)
