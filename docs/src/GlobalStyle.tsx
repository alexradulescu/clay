import { createGlobalStyle } from "@alexradulescu/clay";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
    color: #1a1a1a;
  }

  code, pre {
    font-family: 'Fira Code', ui-monospace, monospace;
  }
`;
