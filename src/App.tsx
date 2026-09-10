import { useEffect } from "react";
import useEnigma from "./Enigma/useEnigma";

function App() {
  // Create an Enigma machine
  const { importSettings, encode, output } = useEnigma();

  useEffect(() => {
    importSettings({
      type: "M3",
      reflector: {
        type: "B",
        wirings: [],
      },
      leftRotor: {
        ringPosition: 0,
        type: "I",
        windowLetter: "A",
      },
      centerRotor: {
        ringPosition: 0,
        type: "II",
        windowLetter: "A",
      },
      rightRotor: {
        ringPosition: 0,
        type: "III",
        windowLetter: "A",
      },
      wirings: [],
    });
  }, [importSettings]);

  useEffect(() => {
    encode("AAAAA");
  }, [encode]);

  return (
    <>
      <h1>Enigma React</h1>
      <p>
        Basically this is the base for the reactive functionality of an Enigma
        Machine, but independent from the UI implementation. Some details are
        oriented for the implementation on enigma-ui, but whatever.
      </p>
      <h2>Sample</h2>
      <p>
        This is an output from a basic Enigma machine: {output}. You should read
        BDZGO, which is AAAAA on an M3 machine, with reflector B and rotors in
        order I, II and III set on letter A and no ring position, and without
        letter swapping.
      </p>
      <h2>Known inconsistencies</h2>
      <p>
        For now the only logic inconsistency that I could think of is backspace,
        since encode can take multiple letters as inputs a backspace will revert
        the situation before the multiple input, not remove a letter.
      </p>
    </>
  );
}

export default App;
