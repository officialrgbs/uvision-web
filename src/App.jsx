import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const uvFacts = {
  bottle: [
    "UV disinfects drinking water.",
    "Used in wastewater treatment plants.",
  ],
  person: [
    "UV helps produce Vitamin D in skin.",
    "Too much UV causes sunburn and skin damage.",
  ],
  cell_phone: [
    "UV boxes sterilize phones and gadgets.",
  ],
  book: [
    "Libraries use UV to disinfect returned books.",
  ],
  default: [
    "UV has many applications in health, security, and environment."
  ]
};

function App() {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detectedFacts, setDetectedFacts] = useState([]);

  useEffect(() => {
    cocoSsd.load().then(setModel);
  }, []);

  const detect = async () => {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const predictions = await model.detect(webcamRef.current.video);
      if (predictions.length > 0) {
        const objName = predictions[0].class.toLowerCase();
        const facts = uvFacts[objName] || uvFacts.default;
        setDetectedFacts(facts);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => detect(), 2000); // every 2 sec
    return () => clearInterval(interval);
  }, [model]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>UV in Action</h1>
      <Webcam
        ref={webcamRef}
        style={{ width: 640, height: 480, borderRadius: "12px" }}
      />
      {detectedFacts.length > 0 && (
        <div style={{
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "1em",
          marginTop: "1em",
          borderRadius: "12px"
        }}>
          <h2>UV Applications</h2>
          <ul>
            {detectedFacts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
