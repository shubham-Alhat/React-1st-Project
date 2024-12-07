import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setisNumber] = useState(false);
  const [isChar, setisChar] = useState(false);
  const [pass, setpass] = useState("");
  const [btnText, setBtnText] = useState("Copy");

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters = "!@#$%^&*()_-+=<>?";

  const passwordRef = useRef(null);

  function copyToClipBoard() {
    // to have blue bg on selected password
    passwordRef.current?.select();

    // main code line to copy the current password
    window.navigator.clipboard.writeText(pass);

    // to change btn text
    setBtnText("Copied");
    setTimeout(() => {
      setBtnText("Copy");
    }, 3000);
  }

  const generatePassword = useCallback(() => {
    let Password = "";
    let charPool = letters;
    if (isNumber) charPool = charPool + numbers;
    if (isChar) charPool = charPool + characters;

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charPool.length);
      Password = Password + charPool[randomIndex];
    }
    setpass(Password);
  }, [length, isNumber, isChar]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumber, isChar, generatePassword]);

  return (
    <>
      <div className="h-full w-full bg-black flex  justify-center items-center mt-6 px-4">
        <div className="*:my-3 w-full">
          <h1 className="text-white text-3xl text-center">
            Password Generator
          </h1>
          <div className="flex">
            <input
              readOnly
              placeholder="Password"
              type="text"
              value={pass}
              ref={passwordRef}
              className="w-full px-4 outline-none rounded-l-md"
            />
            <button
              onClick={copyToClipBoard}
              className="bg-blue-500 px-2 py-1 hover:bg-blue-600 rounded-r-md"
            >
              {btnText}
            </button>
          </div>

          <div className="flex gap-4 text-white">
            <div className="flex justify-center items-center">
              <input
                type="range"
                min={8}
                value={length}
                max={20}
                onChange={(event) => setLength(event.target.value)}
              />
              <label>Lenght: {length}</label>
            </div>

            {/* checkbox */}
            <div>
              <input
                type="checkbox"
                onClick={() => setisNumber(!isNumber)}
                className="cursor-pointer"
              />
              <label htmlFor=""> Number:{isNumber ? "Yes" : "No"}</label>
            </div>

            {/* checkbox 2 */}
            <div>
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => setisChar(!isChar)}
              />
              <label htmlFor="">Character :{isChar ? "Yes" : "No"}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
