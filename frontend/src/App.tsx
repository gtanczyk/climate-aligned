import React, {useEffect, useState} from 'react';
import "monday-ui-react-core/dist/main.css"

import Home from "./home";
import Survey from "./survey";
import Stats from "./stats";


function App() {
    const [currentView, setCurrentView] = useState<"home" | "survey" | "stats">("home");

    switch (currentView) {
        case "home":
            return <Home onSurvey={() => setCurrentView("survey")} onStats={() => setCurrentView("stats")}/>;
        case "survey":
            return <Survey onHome={() => setCurrentView("home")}/>;
        case "stats":
            return <Stats onHome={() => setCurrentView("home")}/>;
        default:
            return null;
    }
}

export default App;
