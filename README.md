# Taco Static Site Generator

Taco is a simple Static Site Generator (SSG) that allows you to create static HTML pages from custom `.tc` files. It supports dynamic compilation and live reloading during development, making it easy to build and preview your static sites.

## Features

- **Dynamic Compilation**: Automatically compiles `.tc` files into HTML.
- **Live Reloading**: Uses BrowserSync to reload the browser when files change.
- **SEO Optimization**: Supports metadata tags for better SEO.
- **Custom Tags**: Easily define and use custom tags in your `.tc` files.

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

### Development

To start the development server with live reloading, run:

```bash
npm run dev
```

This will start an Express server and BrowserSync for live reloading. The server will dynamically compile the `.tc` files and serve the generated HTML.

### Build

To generate a production build, run:

```bash
npm run build
```

This will compile the `.tc` files and output the static HTML files to the `dist` directory.

## Example

Here is an example of a `.tc` file:

```plaintext
page[title: "Mi Landing Taco", description: "Ejemplo de Taco para SEO", url: "https://mi-sitio.com"]

h1 Bienvenido a nuestra página Taco
p Esta es una landing optimizada para SEO.
h2 Haz click, ahora ya no, ahora si
h4 holaaaaa
p hello
h1 ya se pudo
```

This will generate the following HTML:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Mi Landing Taco</title>
  <meta name="description" content="Ejemplo de Taco para SEO">
  <meta property="og:url" content="https://mi-sitio.com">
</head>
<body>
  <h1>Bienvenido a nuestra página Taco</h1>
  <p>Esta es una landing optimizada para SEO.</p>
  <h2>Haz click, ahora ya no, ahora si</h2>
  <h4>holaaaaa</h4>
  <p>hello</p>
  <h1>ya se pudo</h1>
</body>
</html>
```

## License

This project is licensed under the MIT License.
