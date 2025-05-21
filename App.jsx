import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CoachToolApp() {
  const [step, setStep] = useState("start");
  const [redFlags, setRedFlags] = useState([]);
  const [mildSymptoms, setMildSymptoms] = useState([]);
  const [testResults, setTestResults] = useState({ answersCorrect: true, motorTestOk: true });

  const toggleItem = (list, setList, item) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const redFlagItems = [
    "Bewustzijnsverlies",
    "Verwardheid",
    "Balansproblemen",
    "Misselijkheid of braken",
    "Dubbel of wazig zien",
    "Speler zegt: 'het klopt niet'"
  ];

  const mildSymptomItems = [
    "Hoofdpijn",
    "Duizeligheid",
    "Licht- of geluidsgevoeligheid",
    "Moeite met concentratie",
    "Vermoeidheid",
    "'Ik voel me niet helemaal goed'"
  ];

  const renderStart = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">CoachTool: Hersencheck 20"</h2>
        <Button className="w-full mb-2" onClick={() => setStep("redflags")}>Rode vlaggen-check</Button>
        <Button className="w-full mb-2" onClick={() => setStep("twentysec")}>20-seconden test</Button>
        <Button className="w-full" onClick={() => setStep("info")}>Info & uitleg</Button>
      </CardContent>
    </Card>
  );

  const renderRedFlags = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Rode vlaggen</h3>
        {redFlagItems.map((item) => (
          <div key={item}>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={redFlags.includes(item)} onChange={() => toggleItem(redFlags, setRedFlags, item)} />
              <span>{item}</span>
            </label>
          </div>
        ))}
        <Button className="mt-4" onClick={() => setStep("redflagresult")}>Bekijk resultaat</Button>
      </CardContent>
    </Card>
  );

  const renderRedFlagResult = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        {redFlags.length > 0 ? (
          <>
            <h3 className="text-red-600 font-bold">Stoppen!</h3>
            <p>Er is ten minste 1 rode vlag gemeld. Laat de speler niet verder spelen. Adviseer contact met een arts.</p>
          </>
        ) : (
          <>
            <h3 className="text-green-600 font-bold">Geen rode vlaggen</h3>
            <p>Ga door naar 20-seconden test of controleer op milde symptomen.</p>
            <Button className="mt-4 mr-2" onClick={() => setStep("mild")}>Milde symptomen</Button>
            <Button className="mt-4" onClick={() => setStep("twentysec")}>20-seconden test</Button>
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderMildSymptoms = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Milde symptomen</h3>
        {mildSymptomItems.map((item) => (
          <div key={item}>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={mildSymptoms.includes(item)} onChange={() => toggleItem(mildSymptoms, setMildSymptoms, item)} />
              <span>{item}</span>
            </label>
          </div>
        ))}
        <Button className="mt-4" onClick={() => setStep("mildresult")}>Bekijk advies</Button>
      </CardContent>
    </Card>
  );

  const renderMildResult = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        {mildSymptoms.length > 0 ? (
          <>
            <h3 className="text-yellow-600 font-bold">Let op!</h3>
            <p>Er zijn milde symptomen gemeld. Laat de speler 10 minuten rusten. Hercontroleer daarna. Geen verbetering? Laat niet verder spelen.</p>
          </>
        ) : (
          <>
            <h3 className="text-green-600 font-bold">Geen symptomen</h3>
            <p>Geen milde klachten gemeld. Blijf de speler wel goed monitoren.</p>
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderTwentySec = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">20-seconden test</h3>
        <label className="block mb-2">Antwoorden juist beantwoord?</label>
        <select className="mb-4" value={testResults.answersCorrect ? "ja" : "nee"} onChange={(e) => setTestResults({ ...testResults, answersCorrect: e.target.value === "ja" })}>
          <option value="ja">Ja</option>
          <option value="nee">Nee</option>
        </select>
        <label className="block mb-2">Bewegingstest (balans/rennen) oké?</label>
        <select value={testResults.motorTestOk ? "ja" : "nee"} onChange={(e) => setTestResults({ ...testResults, motorTestOk: e.target.value === "ja" })}>
          <option value="ja">Ja</option>
          <option value="nee">Nee</option>
        </select>
        <Button className="mt-4" onClick={() => setStep("twentyresult")}>Bekijk resultaat</Button>
      </CardContent>
    </Card>
  );

  const renderTwentyResult = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        {testResults.answersCorrect && testResults.motorTestOk ? (
          <>
            <h3 className="text-green-600 font-bold">Speler lijkt oké</h3>
            <p>Er zijn geen directe signalen. Blijf de speler monitoren. Bij twijfel: niet laten spelen.</p>
          </>
        ) : (
          <>
            <h3 className="text-red-600 font-bold">Niet verder laten spelen</h3>
            <p>Er zijn aanwijzingen dat de speler niet in orde is. Laat hem/haar niet meer het veld op.</p>
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderInfo = () => (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h3 className="text-lg font-semibold">Info & bronnen</h3>
        <p className="mt-2">Deze app is gebaseerd op SCAT5 en KNHB-richtlijnen voor hersenschudding. Raadpleeg bij twijfel altijd een arts.</p>
        <ul className="list-disc pl-5 mt-2">
          <li><a href="https://bjsm.bmj.com/content/51/11/851" target="_blank" className="text-blue-600 underline">SCAT5 samenvatting</a></li>
          <li><a href="https://www.knhb.nl/kenniscentrum/blessures/hersenschudding" target="_blank" className="text-blue-600 underline">KNHB hersenschudding</a></li>
        </ul>
      </CardContent>
    </Card>
  );

  const screens = {
    start: renderStart,
    redflags: renderRedFlags,
    redflagresult: renderRedFlagResult,
    mild: renderMildSymptoms,
    mildresult: renderMildResult,
    twentysec: renderTwentySec,
    twentyresult: renderTwentyResult,
    info: renderInfo
  };

  return <div className="p-4">{screens[step]()}</div>;
}