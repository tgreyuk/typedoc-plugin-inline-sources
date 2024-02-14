# typedoc-plugin-inline-sources

A plugin for [TypeDoc](https://github.com/TypeStrong/typedoc) that inlines source code into documentation.

[![npm](https://img.shields.io/npm/v/typedoc-plugin-inline-sources.svg)](https://www.npmjs.com/package/typedoc-plugin-inline-sources) [![Build Status](https://github.com/tgreyuk/typedoc-plugin-inline-sources/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/tgreyuk/typedoc-plugin-inline-sources/actions/workflows/ci.yml)

## What it does?

The plugin retrieves the source from the ts compiler and injects within fenced code blocks.

## Installation

```bash
npm install --save-dev typedoc typedoc-plugin-inline-sources
```

## Usage

Simply use the `@source` annotation in your comments. This will create a tag with the inlined source code.

### Code

```typescript
/**
 * Comments for variable
 *
 * @source source tag comment?
 */
export const message = "Hello World!";
```

### Output

![image](https://user-images.githubusercontent.com/11680870/120396197-0f726800-c32e-11eb-800e-8cf7466635bb.png)
