import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: all 0.3s
  }

:root{
  --light-text: #eaeaea;
  --dark-background-text: #f6f8f7;
  --sidebar-background: #FDF0D1;
  --button-background: #AC7D88;
  --button-background-active: #561C24;
  --color-dark-200: #27374D;
  --color-dark-100: #4F4557;
  --color-note:#c1c1c1;
  --button2-background-active: #cb5043;
  --button2-background:#e29e97;
}

html {
  font-size: 62.5%;
  min-height: 100%;
}

body{
  min-height: 100vh;
  line-height: 1.5;
  font-size:1.6rem;
  font-family: 'Poppins', sans-serif;
  position: relative;
}

input, button, select{
  color: inherit;
  font: inherit
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none
}

ul {
  list-style: none
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

@keyframes fade-down {
0% {
opacity: 0; 
transform: translateY(-50%) scale(0.9);
/* left: 50%; */
  transform: translateX(-50%);
}
100% {
opacity: 1;
transform: translateY(0) scale(1);
/* left: 50%; */
  transform: translateX(-50%);
}
}

@keyframes slide-from-left {
  0%{
    transform: translateX(-120%);
  }
  25%{
    transform: translateX(-90%)
  }
  50%{
    transform: translateX(-60%)
  }
  75%{
    transform: translateX(-30%)
  }
  100%{
    transform: translateX(0)
  }
}
@keyframes slide-out-right {
  0%{
    transform: translateX(0)
  }
  25%{
    transform: translateX(-30%)
  }
  50%{
    transform: translateX(-60%)
  }
  75%{
    transform: translateX(-90%)
  }
  100%{
    transform: translateX(-120%);
  }
}

@keyframes spin {
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
}
`;

export default GlobalStyles;
