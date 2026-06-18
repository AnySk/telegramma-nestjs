<p align="center">
  <img src="https://raw.githubusercontent.com/robot-mafia/nestjs-telegraf/main/.github/logo.svg" />
</p>

# ![npm](https://img.shields.io/npm/dm/@anysk/telegramma-nestjs) ![GitHub last commit](https://img.shields.io/github/last-commit/AnySk/telegramma-nestjs) ![NPM](https://img.shields.io/npm/l/@anysk/telegramma-nestjs)

Telegramma NestJS – powerful solution for creating Telegram bots.

> **Fork notice.** This is a maintained fork of [`nestjs-telegraf`](https://github.com/0x467/nestjs-telegraf), published as **`@anysk/telegramma-nestjs`**. It tracks the latest **Telegram Bot API (v10.1)** by overriding Telegraf's type dependency with the sibling fork [`@anysk/telegramma-types`](https://github.com/AnySk/telegramma-types).

This package uses the best of the NodeJS world under the hood. [Telegraf](https://github.com/telegraf/telegraf) is the most powerful library for creating bots and [NestJS](https://github.com/nestjs) is a progressive framework for creating well-architectured applications. This module provides fast and easy way for creating Telegram bots and deep integration with your NestJS application. 

**Features**

- Simple. Easy to use.
- Ton of decorators available out of the box for handling bot actions.
- Ability to create custom decorators.
- Scenes support.
- Telegraf plugins and custom plugins support.
- Ability to run multiple bots simultaneously.
- Full support of NestJS guards, interceptors, filters and pipes!

## Installation

```bash
$ npm i @anysk/telegramma-nestjs telegraf
```

### Getting Bot API v10.1 types

Telegraf still ships older `@telegraf/types`. To use the updated types from this
fork, add an [npm override](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides)
in your app's `package.json` so Telegraf resolves to `@anysk/telegramma-types`:

```jsonc
"overrides": {
  "@telegraf/types": "npm:@anysk/telegramma-types@^10.1.0"
}
```

Then reinstall (`npm install`). Imports from `telegraf` now expose all Bot API
v10.1 types (rich messages, live photos, guest mode, poll media, etc.).

## Documentation
Check out the [documentation site](https://telegramma-nestjs-docs.samoilenko.tk/).

## Activity
![Alt](https://repobeats.axiom.co/api/embed/3a0b83192feaeff27d8a7f78f53e5cb951f94dac.svg "Repobeats analytics image")
