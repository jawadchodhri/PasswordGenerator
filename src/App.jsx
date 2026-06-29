import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [largeAlpha, setLargeAlpha] = useState(false)
  const [smallAlpha, setSmallAlpha] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str
    let LargeStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let SmallStr = "abcdefghijklmnopqrstuvwxyz"
    if (largeAlpha){
      if (numberAllowed) LargeStr += "0123456789"
      if (charAllowed) LargeStr += "!@#$%^&*-_+=[]{}~`"
      for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * LargeStr.length + 1)
      pass += LargeStr.charAt(char)
    }
    }else{
      if (numberAllowed) SmallStr += "0123456789"
      if (charAllowed) SmallStr += "!@#$%^&*-_+=[]{}~`"
      for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * SmallStr.length + 1)
      pass += SmallStr.charAt(char)  
    }
    }
    
    setPassword(pass)


  }, [length, numberAllowed, charAllowed, largeAlpha, smallAlpha, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-6 py-5 my-8 bg-gray-800 text-orange-500">
  <h1 className="text-white text-center my-3 text-3xl font-bold">
    Password Generator
  </h1>

  <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-2 px-3"
      placeholder="Password"
      readOnly
      ref={passwordRef}
    />

    <button
      onClick={copyPasswordToClipboard}
      className="outline-none bg-blue-700 text-white px-4 py-1 shrink-0"
    >
      Copy
    </button>
  </div>

  <div className="flex flex-wrap text-sm gap-4">
    <div className="flex items-center gap-x-2">
      <input
        type="range"
        min={6}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <label>Length: {length}</label>
    </div>

    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        checked={numberAllowed}
        id="numberInput"
        onChange={() => setNumberAllowed((prev) => !prev)}
      />
      <label htmlFor="numberInput">Numbers</label>
    </div>

    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        checked={charAllowed}
        id="characterInput"
        onChange={() => setCharAllowed((prev) => !prev)}
      />
      <label htmlFor="characterInput">Characters</label>
    </div>

    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        checked = {largeAlpha}
        id="uppercaseInput"
        onChange = {() => setLargeAlpha((prev) => !prev)}
      />
      <label htmlFor="uppercaseInput">Large Alphabets</label>
    </div>

    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        checked = {smallAlpha}
        id="lowercaseInput"
        onChange = {() => setSmallAlpha((prev) => !prev)}
      />
      <label htmlFor="lowercaseInput">Small Alphabets</label>
    </div>
  </div>
</div>
    
  )
}

export default App