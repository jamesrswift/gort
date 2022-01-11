<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNUv3 License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jamesxx/gort">
    <img src="images/gort_logo_128.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Gort</h3>

  <p align="center">
    A modular typescript reddit moderation tool with a rule-action paradigm as a supplement to automod
    <br />
    <a href="https://github.com/jamesxx/gort"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/jamesxx/gort/issues">Report Bug</a>
    ·
    <a href="https://github.com/jamesxx/gort/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

An iterative improvement upon its predecessor, Gort is a typescript reddit moderation bot which can act as a supplement (or upgrade) to reddit's automoderator, born out of a need for more complicated rulesets and context-sensitive actions. Rules can be created simply using in-built helper classes, allowing non-programmers to make additions.

My aim for the future of the project is to create an easy-to-use web-interface that will allow moderators to configure the bot at runtime. Another posibility includes configuring the bot through reddit wiki pages.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [NodeJS](https://nodejs.org/)
* [Discord.js](https://discord.js.org/)
* [Snoowrap](https://github.com/not-an-aardvark/snoowrap)
* Blood, sweat and tears

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jamesxx/gort.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure the bot in `.env`
   ```env
    DISCORD_TOKEN=
    REDDIT_USERAGENT=
    REDDIT_CLIENTID=
    REDDIT_CLIENTSECRET=
    REDDIT_USERNAME=
    REDDIT_PASSWORD=
    REDDIT_SUBREDDIT=
    DATABASE_URI=
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Once configured, Gort can be used to perform automated actions on new comments and submissions in your subreddit based on logic defined in its ruleset. This includes banning users, locking or removing comments, replying to a new comment or submission automatically (which itself can be locked and/or distinguished), adding a usernote on a user, or making a notification to a chosen Discord channel.

More niche uses include getting notified about new comments or submission made by selected users, and detecting comments made by traffic originating from other subreddits from which yours has been linked, as a means of detecting and thwarting brigading.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] Detect repeat posts automatically
- [] Detect whether a user is making a comment in your subreddit for the first time
- [] Catch editted and modqueued items aswell, not only new comments/submissions
- [] Modmail notifications
- [] Call commands as a comment, to make mobile moderation easier
- [] Web interface
    - [] Persistent variables and customisation from web for rules
    - [] Stats interface to monitor subreddit health

See the [open issues](https://github.com/jamesxx/gort/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GPL-3.0-only License. See [LICENSE.md](https://github.com/jamesxx/gort/blob/master/LICENSE.md) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Icons made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/) 
* [iMrDJAi](https://github.com/iMrDJAi/)'s maintained fork of [Snoowrap](https://github.com/iMrDJAi/snoowrap)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jamesxx/gort.svg?style=for-the-badge
[contributors-url]: https://github.com/jamesxx/gort/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/jamesxx/gort.svg?style=for-the-badge
[forks-url]: https://github.com/jamesxx/gort/network/members

[stars-shield]: https://img.shields.io/github/stars/jamesxx/gort.svg?style=for-the-badge
[stars-url]: https://github.com/jamesxx/gort/stargazers

[issues-shield]: https://img.shields.io/github/issues/jamesxx/gort.svg?style=for-the-badge

[issues-url]: https://github.com/jamesxx/gort/issues

[license-shield]: https://img.shields.io/github/license/jamesxx/gort.svg?style=for-the-badge
[license-url]: https://github.com/jamesxx/gort/blob/master/LICENSE.md

