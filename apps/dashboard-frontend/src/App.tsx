import type { App } from "app";
import { treaty } from "@elysiajs/eden";
import { useEffect } from "react";

function App() {
  const client = treaty<App>("localhost:3000");

  function signin() {
    client.auth["sign-in"]
      .post({
        email: "email",
        password: "password",
      })
      .then((result) => {
        if (result.status == 200) {
          const data = result.data;
        }
      });
  }

  return (
    <div>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button onClick={signin}>Sign in</button>
    </div>
  );
}

export default App;
