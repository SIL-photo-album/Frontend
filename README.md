# Photo_Album_SIL

`# Photo_Album_SIL` is a web application that allows us to view a list of users, their albums and photos.

## Installation Instructions

### On Linux

Run this command to install `Curl`

```bash
    sudo apt update
    sudo apt upgrade -y
    sudo apt install curl -y
```

Then install `Node js`

```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Activate `NVM` using the command below

```bash
    .bashrc
```

### Install the latest LTS version of Node

```bash
    nvm install --lts
```

### Make the default LTS version as NVM

```bash
    nvm alias default 18.18.2
```

check to see if node js has been installed successfully

```bash
    node --version
    # or
    node -v
```

Switch to `Node version 18 or 20` using this command

```bash
    nvm use 18
    #or
    nvm use 20
```

## How to setup and run unit tests locally

### Setting Up

To setup the project, you need to clone the project and install the dependencies.

1. To clone, run the following command

```bash
    git clone git@github.com:SIL-photo-album/Frontend.git
    cd Frontend
```

2. Install the dependencies using the following command

```bash
    npm install
```

### Unit Test

To run unit tests, run the following command in the terminal: 1. From your root folder, run `npm run  test`

### Starting the Project

To start and view the project, run `npm run dev`
this will run on port 3000
