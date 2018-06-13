import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  button, input, select, textarea {
    border: solid 1px #ccc;
  }

  input[type="button"]:hover {
    background-color: #ccc;
  }

  input[type="text"] {
    color: #0fb9bf;
  }

  .container {
    width: 958px;
    text-align: left;
    display: inline-block;
    }

  .rounded-coner {
    border-radius: 5px;
  }

  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }
  .flex-10 {
    flex: 10;
  }
  .flex-2 {
    flex: 2;
  }

  .padding-10 {
    padding: 10px;
  }
  .margin-t-10 {
    margin-top: 10px;
  }

  .error {
    color: #e03c31;
  }
`;
