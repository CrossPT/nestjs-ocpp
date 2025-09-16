<p align="center">
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://avatars1.githubusercontent.com/u/0?s=200&v=4" width="200" alt="Nest Logo" />
    </a>
  </p>
  <p align="center">A OCPP Injectable module for <a href="http://nestjs.com/" target="_blank">Nestjs</a>.</p>
</p>

[![npm version](https://img.shields.io/npm/v/nestjs-ocpp)](https://www.npmjs.com/package/nestjs-ocpp)
[![miniziped size](https://badgen.net/bundlephobia/minzip/nestjs-ocpp)](https://bundlephobia.com/result?p=nestjs-ocpp)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/react-colorful)](https://github.com/CrossPT/nestjs-ocpp)
[![MIT licensed](https://img.shields.io/github/license/CrossPT/nestjs-ocpp)](https://raw.githubusercontent.com/CrossPT/nestjs-ocpp/main/LICENSE)

## Description

A Nest module for `OCPP` protocol (Supports 1.6)

## Installation

```bash
$ npm i --save nestjs-ocpp
```

```bash
$ yarn add nestjs-ocpp
```

## Getting Started

To use OCPP we need to register module for example in app.module.ts

```javascript
import { OcppModule } from 'ocpp-module';

@Module({
  imports: [
    OcppModule.forRoot({
      versions: ['ocpp1.6'], // Support for 1.6 protocol of OCPP
    }),
  ],
})
export class AppModule {}
```

## Support
