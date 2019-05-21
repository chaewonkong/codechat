# ⌨️ CodeChat ⌨️

## Description

### 🙋‍ Exchange code reviews by chatting while reading codes at the same time
![code-editing](./client/public/video.gif)
<br />Demo Video

### See demo *[here](https://codechat.netlify.com)*

## Dev stack
- React
- socket.io-client
- Express.js
- Socket.io

## Features
- [x] New User
- [x] Get User Nickname
- [x] Get New Messages
- [x] User Connection
- [x] Live Code Editing

## Getting Started

### Prerequisites
| Require                              | Description                                                          |
| ------------------------------------ | -------------------------------------------------------------------- |
| [Node.js](nodejs.org)                | 10.10 LTS or above                                                   |
| [Yarn](https://yarnpkg.com/lang/en/) | Recommend [stable version](https://github.com/yarnpkg/yarn/releases) |

#### Install Node, Yarn

The project manages the version of node through `nvm`

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
$ command -v nvm
$ nvm install
$ which node
$ npm install -g yarn
```

In the project root as follows are performed through the `.nvmrc`

```
$ nvm use
Found '/Users/user/Github/higherlowerkor/.nvmrc' with version <10.10.0>
```
### env
fill out `.env` for your socket.io-server
```
REACT_APP_SERVER_URL=${your socket.io server url}
```

### Yarn CLIs

#### Install project
```bash
$ nvm use
...
$ yarn
```
#### Build project
```bash
$ yarn build
```
#### Test project
```bash
$ yarn test
```
#### Start project
```bash
$ yarn start
```
## License

MIT