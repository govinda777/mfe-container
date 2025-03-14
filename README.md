## Mastering Micro Frontends: Creating Scalable Applications with React, Webpack 5, and TypeScript Type Safety

Author: [Serif Colakel](https://github.com/serifcolakel)
Code: [Github Repository Link](https://github.com/serifcolakel/mf-template)

Embark on a transformative journey into the realm of micro frontends with our comprehensive article, "Mastering Micro Frontends: Creating Scalable Applications with React, Webpack 5, and TypeScript Type Safety." Delve into the cutting-edge approach that is reshaping modern web development, and learn how to build dynamic and scalable applications that are designed for maintainability, collaboration, and efficiency. Whether you're a seasoned developer or new to the field, this guide will equip you with the knowledge and tools to embrace the power of micro frontends and harness their potential for your projects.

## What Are Micro Frontends?

Micro frontends are a new approach to web development that allows developers to build applications in a modular fashion. This means that each component of the application is developed independently, and then combined into a single application at runtime. This approach has many benefits, including increased maintainability, scalability, and collaboration.

🎉 Let's get started!

# Create a Container App With create-mf-app CLI

**You can follow these steps:**

- Create a new folder. For example, **`micro-front-template`**. You can use the following command to create a new folder:

```bash
mkdir micro-front-template
```

- Navigate to the project directory: Run the following command to navigate into your project directory:

```bash
cd micro-front-template
```

- Create a new project: Run the following command to create a new project:

```bash
npx create-mf-app container
```

Question 1: **Pick the name of your app: (host)** : write **`container`** and press Enter.
Question 2: **Project Type: (Use arrow keys)** : select **`Application`** and press Enter.
Question 3: **Port number: (8080)** : write your port number and press Enter. For example, **`3000`** by default it is **`8080`**.
Question 4: **Framework: (Use arrow keys)** : select **`React`** and press Enter.
Question 5: **Language: (Use arrow keys)** : select **`typescript`** and press Enter.
Question 6: **CSS: (Use arrow keys)** : select **`CSS`** and press Enter.

- Navigate to the project directory: Run the following command to navigate into your project directory:

```bash
cd container
```

- Install the packages: Run the following command to install:

```bash
npm i
```

- Add the tailwind: Run the following command to add the tailwind:

```bash
npm install -D tailwindcss

npx tailwindcss init
```

-- Add the tailwind config file: Run the following command to add the tailwind config file:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Add the tailwind css file: Run the following command to add the tailwind css file:

```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Add the tailwind css file to the index.tsx: Run the following command to add the tailwind css file to the index.tsx:

```js
// ./src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// ...
```

# Create a Remote App With create-mf-app CLI

**You can follow these steps:**

- Create a new folder. For example, **`micro-front-template`**. You can use the following command to create a new folder:

```bash
mkdir micro-front-template
```

- Navigate to the project directory: Run the following command to navigate into your project directory:

```bash
cd micro-front-template
```

- Create a new project: Run the following command to create a new project:

```bash
npx create-mf-app remote
```

Question 1: **Pick the name of your app: (host)** : write **`remote`** and press Enter.
Question 2: **Project Type: (Use arrow keys)** : select **`Application`** and press Enter.
Question 3: **Port number: (8080)** : write your port number and press Enter. For example, **`3001`** by default it is **`8080`**.
Question 4: **Framework: (Use arrow keys)** : select **`React`** and press Enter.
Question 5: **Language: (Use arrow keys)** : select **`typescript`** and press Enter.
Question 6: **CSS: (Use arrow keys)** : select **`CSS`** and press Enter.

- Navigate to the project directory: Run the following command to navigate into your project directory:

```bash
cd remote
```

- Install the packages: Run the following command to install:

```bash
npm i
```

- Add the tailwind: Run the following command to add the tailwind:

```bash
npm install -D tailwindcss

npx tailwindcss init
```

-- Add the tailwind config file: Run the following command to add the tailwind config file:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Add the tailwind css file: Run the following command to add the tailwind css file:

```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Add the tailwind css file to the index.tsx: Run the following command to add the tailwind css file to the index.tsx:

```js
// ./src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// ...
```

# Create a UI Components from the Container App

**You can follow these steps:**

- Download the `clsx` & `class-variance-authority` package: Run the following command to download the package in the `container` & `remote` folder:

```bash
cd container
npm i clsx class-variance-authority
```

```bash
cd remote
npm i clsx class-variance-authority
```

- Create a `Button.tsx` component in the `src/components` folder.

```tsx
import React, { ComponentProps } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";

type ButtonElementProps = ComponentProps<"button">;

export interface ButtonProps
  extends ButtonElementProps,
    VariantProps<typeof buttonStyles> {
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  buttonWrapperClassName?: string;
}

const buttonStyles = cva(
  "flex text-xs group flex-row gap-x-2 items-center justify-center disabled:!bg-gray-800",
  {
    variants: {
      buttonType: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-black text-white hover:bg-white hover:text-black",
        error: "bg-error-600 text-white hover:bg-error-700",
        warning: "bg-warning-500 text-white hover:bg-warning-600",
        success: "bg-success-500 text-white hover:bg-success-600",
        info: "bg-blue-500 text-white hover:bg-blue-600",
        default: "bg-gray-400 text-white hover:bg-gray-500",
      },
      size: {
        default: "h-[38px]",
        sm: "h-8 !w-8",
        lg: "h-12",
        xl: "h-14",
        xxl: "h-16",
      },
      padding: {
        default: "px-5 py-2",
        sm: "px-3 py-2",
        lg: "px-5 py-3",
        xl: "px-5 py-4",
        xxl: "px-5 py-5",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        none: "rounded-none",
        full: "rounded-full",
      },
      isFullWidth: {
        true: "!w-full",
        false: "w-auto",
      },
    },
    compoundVariants: [{ buttonType: "primary", size: "default" }],
    defaultVariants: {
      buttonType: "primary",
      size: "default",
      rounded: "default",
      padding: "default",
      isFullWidth: false,
    },
  }
);

function Button({
  label,
  buttonType,
  rounded,
  padding,
  size,
  isFullWidth,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <div className={buttonProps.buttonWrapperClassName}>
      <button
        className={clsx(
          className,
          buttonStyles({
            buttonType,
            rounded,
            padding,
            size,
            isFullWidth,
          })
        )}
        type="button"
        {...buttonProps}
      >
        {buttonProps.icon && <div>{buttonProps.icon}</div>}
        {!!label && <label className="cursor-pointer">{label}</label>}
        {buttonProps.rightIcon && <div>{buttonProps.rightIcon}</div>}
      </button>
    </div>
  );
}

export default Button;
```

# Webpack Configuration for Applications

- In the `container` folder, `webpack.config.js` file should be like this:

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// INFO (serif) : Your webpack config should be like this.
const configs = {
  appName: "container",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATH: "remote@http://localhost:3001/remoteEntry.js",
    PORT: 3000,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATH: "remote@http://localhost:3001/remoteEntry.js",
    PORT: 3000,
  },
};

// INFO (serif) : Define the package.json dependencies.
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  console.log({ env, argv, configs: configs[argv.mode] });

  return {
    output: {
      // INFO (serif) : The output path for the build files.
      publicPath: configs[argv.mode].PUBLIC_PATH,
    },

    resolve: {
      // INFO (serif) : The extensions that should be used to resolve modules.
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    // INFO (serif) : The configuration for the dev server.
    devServer: {
      hot: true, // INFO (serif) : Enable webpack's Hot Module Replacement feature
      port: configs[argv.mode].PORT,
      historyApiFallback: true,
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    },

    // INFO (serif) : The module configuration.
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    // INFO (serif) : The plugins configuration.
    plugins: [
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        remotes: {
          remote: configs[argv.mode].REMOTE_PATH,
        },
        exposes: {
          // INFO (serif) : Expose the components.
          "./Button": "./src/components/Button.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
```

- Create Test Page in `remote` folder.

```tsx
import React from "react";

export default function TestPage() {
  return <div className="text-blue-600 md:text-gray-600">Test Page</div>;
}
```

- Add the `TestPage` to `remote` folder `webpack.config.js` file. In the `remote` folder, `webpack.config.js` file should be like this:

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// INFO (serif) : Your dependencies should be like this.
const deps = require("./package.json").dependencies;

// INFO (serif) : Your webpack config should be like this.
const configs = {
  appName: "remote",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
};

module.exports = (env, argv) => {
  console.log({ env, argv, configs: configs[argv.mode] });
  return {
    output: {
      // INFO (serif) : The output path for the build files.
      publicPath: configs[argv.mode].PUBLIC_PATH,
    },

    // INFO (serif) : The configuration for the dev server.
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    // INFO (serif) : The configuration for the dev server.
    devServer: {
      hot: true, // INFO (serif) : Enable webpack's Hot Module Replacement feature
      port: configs[argv.mode].PORT,
      historyApiFallback: true, // INFO (serif) : When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
      allowedHosts: "all", // INFO (serif) : Allow all hosts
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    },

    // INFO (serif) : The module configuration.
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    // INFO (serif) : The plugins configuration.
    plugins: [
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        remotes: {
          container: configs[argv.mode].CONTAINER_PATH,
        },
        exposes: {
          "./TestPage": "./src/pages/test/index.tsx", // INFO (serif) : your test page path
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
```

- Start the `container` and `remote` projects.

```bash
cd container
npm start
```

```bash
cd remote
npm start
```

🎉 Congratulations! Your project is ready.

# Issue is How to integrate the components types to remote project?

In this section, we will integrate the components types to remote project. You can choose one of the following methods.

## Method 1: Copy the types to remote project

## Method 3: Create a new package for types and publish it to npm
## Method 4: Create a local types package and integrate it to remote project

I will explain the `Method 4` in this section.

- I will use [module-federation-types](https://www.npmjs.com/package/@cloudbeds/webpack-module-federation-types-plugin) package for this section.

- Install the `module-federation-types` package to `container` project.

```bash
cd container
npm i @cloudbeds/webpack-module-federation-types-plugin
```

- Create a new folder in root of `container` project and name it `federation.config.json`. It includes the exposed components types.

```json
{
  "name": "container",
  "exposes": {
    "./Button": "./src/components/Button.tsx"
  }
}
```

- Then run the following command to generate the types.

```bash
npx make-federated-types
```

> If the `make-federated-types` command is not working and the error is like this: `container/tsconfig.json: Unexpected token in JSON at position 502`. You can check the `tsconfig.json` file and removed `,` from the end of the array.

✅ The `tsconfig.json` file should be like this:

```json
 "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ]
```

❌ Remove the `,` from the end of the array.

```json
 "lib": [
      "dom",
      "dom.iterable",
      "esnext", ❌
    ]
```

- Create new folder for types in `remote` project and name it `container.d.ts`. Then copy the generated types to this file.

```ts
/// <reference types="react" />
declare module "container/Button" {
  import React, { ComponentProps } from "react";
  import { type VariantProps } from "class-variance-authority";
  type ButtonElementProps = ComponentProps<"button">;
  export interface ButtonProps
    extends ButtonElementProps,
      VariantProps<typeof buttonStyles> {
    label?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    buttonWrapperClassName?: string;
  }
  const buttonStyles: (
    props?:
      | ({
          buttonType?:
            | "error"
            | "default"
            | "success"
            | "primary"
            | "secondary"
            | "warning"
            | "info"
            | null
            | undefined;
          size?: "default" | "sm" | "lg" | "xl" | "xxl" | null | undefined;
          padding?: "default" | "sm" | "lg" | "xl" | "xxl" | null | undefined;
          rounded?:
            | "none"
            | "default"
            | "full"
            | "sm"
            | "lg"
            | "xl"
            | "xxl"
            | null
            | undefined;
          isFullWidth?: boolean | null | undefined;
        } & import("class-variance-authority/dist/types").ClassProp)
      | undefined
  ) => string;
  function Button({
    label,
    buttonType,
    rounded,
    padding,
    size,
    isFullWidth,
    className,
    ...buttonProps
  }: ButtonProps): React.JSX.Element;
  export default Button;
}
```

- 🎉 Congratulations! The types are generated. The types will be generated in `types` folder in `dist` folder. Copy the `types` folder to `remote` project.

- Add the `TestPage` component type to `container` project. Create a new file in `src` folder and name it `remote.d.ts`. Then copy the following code to this file.

```ts
/* eslint-disable */
/// <reference types="react" />

declare module "remote/TestPage" {
  function TestPage(): JSX.Element;
  export default TestPage;
}
```

- Use the `Button` component in `remote` project. Fully types support.

```tsx
// src/pages/test/index.tsx
import Button from "container/Button";
import React from "react";

export default function TestPage() {
  return (
    <div className="space-y-2 ">
      <h1 className="text-blue-600 md:text-gray-600">Test Page</h1>
      <Button label="Test Button" buttonType={"error"} />
      <Button label="Test Button" buttonType={"warning"} />
      <Button label="Test Button" buttonType={"primary"} />
      <Button label="Test Button" buttonType={"secondary"} />
      <Button label="Test Button" buttonType={"info"} />
    </div>
  );
}
```

# Other issue with Tailwind CSS

If you are using the Tailwind CSS in your project, tailwind can generate all the `container` styles. But the `remote` project can not generate the styles. You can use the following method to solve this issue.

- The i found the solution in `safeList`, you can check the [Safelist](https://tailwindcss.com/docs/optimizing-for-production#safelisting-specific-classes) documentation. You can define the `Safelist` in `tailwind.config.js` file in `container` project. Then you can access the styles in `remote` project.

❌ Don't forget to add the `safeList` to auto generated. It includes the only styles that you are using in your project.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // width
    { pattern: /w-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /w-\d+\/\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    // height
    { pattern: /h-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /h-\d+\/\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    // padding
    { pattern: /p-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /px-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /py-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /pt-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /pr-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /pb-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /pl-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    // margin
    { pattern: /m-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /mx-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /my-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /mt-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /mr-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /mb-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /ml-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    // gap
    { pattern: /gap-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /gap-x-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /gap-y-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    // space
    { pattern: /space-x-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /space-y-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },

    // text
    { pattern: /text/ },

    // !important text
    { pattern: /!text/ },

    // background
    { pattern: /bg/ },

    // !important bg
    { pattern: /!bg/ },

    // grid & row
    { pattern: /grid/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /grid-cols-\d+/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    {
      pattern: /grid-cols-none/,
      variants: ["sm", "md", "lg", "xl", "desktop"],
    },

    // flex
    { pattern: /flex/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /justify/, variants: ["sm", "md", "lg", "xl", "desktop"] },
    { pattern: /items/, variants: ["sm", "md", "lg", "xl", "desktop"] },

    // rounded
    { pattern: /rounded/ },
    { pattern: /rounded-none/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

# Conclusion

n this guide, we've explored the creation of a micro frontend application using React and the powerful Webpack 5 Module Federation. By breaking down the process into manageable steps, we've created a container app and a remote app, showcasing how different parts can come together seamlessly.

We've covered everything from setting up the project structure, configuring Webpack, and integrating the fantastic Tailwind CSS framework. We've even tackled the issue of sharing UI components and their types between the container and remote apps.

Furthermore, by defining your components with specific types in the development environment, you can enhance the level of type safety across different repositories. TypeScript support becomes a powerful ally in ensuring that your components are used correctly and consistently, even when they're shared between different parts of your micro frontend application.

With TypeScript, you can accurately define the shape of your components, including their props and expected behavior. This approach not only helps catch potential errors during development but also provides clear documentation and guidance for other developers working with these components in remote repositories.

As a result, TypeScript support doesn't just offer a way to catch mistakes early on, but also establishes a solid foundation for collaboration and maintenance across different teams or projects. It ensures that the components' intended usage is adhered to, fostering a more robust and cohesive micro frontend architecture.

From defining UI components and their styles with Tailwind CSS to generating and sharing component types using innovative techniques, this guide has equipped you with a comprehensive understanding of building micro frontend applications.

By following these steps, you're now equipped to take on the exciting world of micro frontends and create scalable, maintainable applications that can be efficiently developed and deployed. Happy coding!

# References

- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [Webpack 5 Module Federation](https://webpack.js.org/concepts/module-federation/)
