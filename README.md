![Ecoleta](./.github/ecoleta.png 'Ecoleta')

# Ecoleta :recycle:

> #### :globe_with_meridians: Helping people find recycling points in an easy way.

[![Author](https://img.shields.io/badge/author-Yuri%20Ziemba-8e44ad?style=flat-square)](https://github.com/yuziem14)
![Version](https://img.shields.io/badge/version-1.0.0-8e44ad?style=flat-square)
[![License](https://img.shields.io/badge/license-MIT-8e44ad?style=flat-square)](LICENSE.md)
![Languages](https://img.shields.io/github/languages/count/yuziem14/ecoleta?style=flat-square&color=8e44ad)
![Stars](https://img.shields.io/github/stars/yuziem14/ecoleta?style=social)
![Contributors](https://img.shields.io/github/contributors/yuziem14/ecoleta?style=social)

<p align="center">
  <img src="./.github/web-ecoleta.gif?raw=true" alt="Ecoleta - Web App" width="800">
</p>
<p align="center">
  <img src="./.github/mobile-ecoleta.gif?raw=true" alt="Ecoleta - Mobile App" width=200>
</p>

---

<p align="center">
  <a href="https://insomnia.rest/run/?label=Ecoleta%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2FYuziem14%2Fecoleta%2Fmaster%2F.github%2Fapi-insomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

---

> This project was build during **Next Level Week** promoted by [Rocketseat](https://github.com/rocketseat)

# :pushpin: Table of Contents

- [Features](#bulb-features)
- [Requirements](#construction-requirements)
- [Installation](#white_check_marker-installation)
- [Quick Start](#rocket-quick-start)
- [Technologies](#fire-technologies)
- [Contributing](#robot-contributing)
- [License](#pencil-license)

# :bulb: Features

- [x] :recycle: Explore recycling points near you.
- [x] :earth_americas: Create new recycling points.
- [x] :mag_right: Filter recycling points by: City, UF and Items.
- [x] :mailbox: Get in touch with the recycle point by Whatsapp or Email.

# :construction: Requirements

- [x] Node.js
- [x] Expo CLI

# :white_check_mark: Installation

**First check if you have all the requirements above, then clone this repository:**

- Using HTTP protocol:

  - `git clone https://github.com/Yuziem14/ecoleta.git`

- Using SSH protocol:
  - `git clone git@github.com:Yuziem14/ecoleta.git`

_Obs: Only clone with SSH if you already have a safe SSH key configured._

# :rocket: Quick Start

1. **Config the server directory, to run your backend** \
    Go to the server folder using `cd server`, then:

   1. In order to install dependencies, run: `npm install`

   2. In order to config your environment variables, run: `cp .env.example .env` and setup the HOST and PORT in the .env file

   3. In order to setup the database, run: `npm run knex:migrate`

   4. In order to seed the database, run: `npm run knex:seed`

   5. Finally, run your server using: `npm run dev`

   _Obs: If you want, use yarn instead of npm._

2. **Config the web directory, to run your fronted** \
    Run the server and go to the web folder using `cd web`, then:

   1. In order to install dependencies, run: `npm install`

   2. In order to config your environment variables, run: `cp .env.example .env` and setup your API URL in the .env file.

   3. Finally, run your app using: `npm run start`

3. **Config the mobile directory, to run your mobile app** \
    Run the server and go to the mobile folder using `cd mobile`, then:

   1. In order to install dependencies, run: `npm install`

   2. In order to config your environment variables, run: `cp src/config/env.example src/config/env.ts` and setup your API URL in the env.ts file.

   3. Finally, run your app using: `expo start`

_Obs: If you want, use yarn instead of npm._

# :fire: Technologies

This project was build with:

- Node.js + Express.js
- React.js
- React Native + Expo

# :robot: Contributing

Read the [Contribute Guidelines](CONTRIBUTING.md).

# :pencil: License

Read the [License](LICENSE.md) for this project.

---

> _Made with :green_heart: by Yuri Ziemba._
