# React + TypeScript + Vite


2048 is a a game in hexagon tiles (https://www.redblobgames.com/grids/hexagons/) based on sliding, 
the rule of the game pretty simple every two tiles with the same value can be merged into one and their sum will combine,
reach to 2048 and you won!

I developed this game to experiment usage of Vite, React.js, Redux toolkit, typescript, svg's, animations, and Jest unit testing.
I will continue to develope the game but for now its uncomplete from my opinion.
feel free to give an hand.

Next Goals: 
Finishing build the unit testing
Scale the game to dynamic radius
Build both client and fetch option as fanctionality.
Adding more animations.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
