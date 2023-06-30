# `@bontiva/espack`

```yarn add @bontiva/espack -dev```

## Usage

### create espack.config.js in root of the projects
```js
// espack.config.js

module.exports = {
	packages: ['packages/*'],
};
```

### Commands

```json
{
"scripts": {
 "espack:init": "espack init",
 "espack:dev": "espack dev"
 "build": "yarn workspaces foreach -piv run build",
 }
}
```
