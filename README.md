# Video demo: https://www.youtube.com/watch?v=imsdAYcVBvg&ab_channel=l%C3%A2mnguy%E1%BB%85n 
# Setup environments:
## Install Go in https://go.dev/dl/ (go1.20.3.darwin-arm64.pkg for Macos)
## Install Ignite CLI (in MacOS)
- Step 1: curl https://get.ignite.com/cli | bash
- Step 2: sudo mv ignite /usr/local/bin/
<img width="562" alt="Screenshot 2023-04-15 at 19 32 57" src="https://user-images.githubusercontent.com/60528316/232223823-0deedee1-2bbf-46a1-b59a-adcdc0805f9c.png">

## Install GO
## Run Wallet back-end and front-end:
- cd Wallet/be && yarn dev
- cd Wallet/fe && yarn dev
Back-end now start on http://localhost:3245
Front-end now start on http://localhost:3000


## Start FE:  https://docs.ignite.com/clients/react

# mycoin
**mycoin** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

## Get started

```
ignite chain serve
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

### Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Ignite CLI docs](https://docs.ignite.com).

### Web Frontend

Ignite CLI has scaffolded a Vue.js-based web app in the `vue` directory. Run the following commands to install dependencies and start the app:

```
cd vue
npm install
npm run serve
```

The frontend app is built using the `@starport/vue` and `@starport/vuex` packages. For details, see the [monorepo for Ignite front-end development](https://github.com/ignite/web).

## Release
To release a new version of your blockchain, create and push a new tag with `v` prefix. A new draft release with the configured targets will be created.

```
git tag v0.1
git push origin v0.1
```

After a draft release is created, make your final changes from the release page and publish it.

### Install
To install the latest version of your blockchain node's binary, execute the following command on your machine:

```
curl https://get.ignite.com/username/MyCoin@latest! | sudo bash
```
`username/MyCoin` should match the `username` and `repo_name` of the Github repository to which the source code was pushed. Learn more about [the install process](https://github.com/allinbits/starport-installer).

## Learn more

- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord  .gg/ignite)
