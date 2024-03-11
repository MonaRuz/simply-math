import { useState } from "react"
import Examples from "./Examples"
import styles from "./App.module.css"
import Settings from "./Settings"

export default function App() {
	//nastavení spuštění příkladů
	const [isRunning, setIsRunning] = useState(false)

	//funkce pro návrat do formuláře
	function handleReset(){
		setIsRunning(false)
	}

	return (
		<div className={styles.app}>
			<h1 className={styles.title}>SimplyMath</h1>
			{!isRunning && <Settings setIsRunning={setIsRunning} />}
			{isRunning && <Examples onReset={handleReset} />}
		</div>
	)
}
