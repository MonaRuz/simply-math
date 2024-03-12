import { useState } from "react"
import styles from "./Settings.module.css"

export default function Settings({ setIsRunning }) {
	//sčítání nebo odčítání
	const [type, setType] = useState("")

	//rozsah čísel v příkladu
	const [minNum, setMinNum] = useState("")
	const [maxNum, setMaxNum] = useState("")

	//rozsah čísel ve výsledku
	const [minRes, setMinRes] = useState("")
	const [maxRes, setMaxRes] = useState("")

	//počet příkladů na jedno cvičení
	const [numEx, setNumEx] = useState("")

	//Typ hodnocení
	const [ratingType, setRatingType] = useState("")

	function handleSaveData(e) {
		e.preventDefault()
		//uložení inputů do objektu
		const newSettings = {
			type: type,
			minNum: minNum,
			maxNum: maxNum,
			minRes: minRes,
			maxRes: maxRes,
			numEx: numEx,
			ratingType: ratingType,
		}
        //validace
		if (
			!type ||
			!minNum ||
			!maxNum ||
			!minRes ||
			!maxRes ||
			!numEx ||
			!ratingType
		)
			return alert("Všechna pole musí být vyplněna!!!")
        //uložení do local storage
		localStorage.setItem("settings", JSON.stringify(newSettings))
		setIsRunning(true)
	}

	return (
		<div className={styles.app}>
			<div className={styles.form}>
				<h2 className={styles.formTitle}>Nastavení příkladů</h2>
				<form onSubmit={handleSaveData}>
					<div>
						<p className={styles.label}>Operace</p>
						<div className={styles.radioBox}>
							<label htmlFor='plus'>
								<input
									type='radio'
									id='plus'
									value='+'
									checked={type === "+"}
									onChange={(e) => setType(e.target.value)}
								/>
								sčítání
							</label>

							<label htmlFor='minus'>
								<input
									type='radio'
									id='minus'
									value='-'
									checked={type === "-"}
									onChange={(e) => setType(e.target.value)}
								/>
								odčítání
							</label>
                            <label htmlFor='multiplication'>
								<input
									type='radio'
									id='multiplication'
									value='*'
									checked={type === "*"}
									onChange={(e) => setType(e.target.value)}
								/>
								násobení
							</label>
                            <label htmlFor='division'>
								<input
									type='radio'
									id='division'
									value='/'
									checked={type === "/"}
									onChange={(e) => setType(e.target.value)}
								/>
								dělení
							</label>
						</div>
					</div>
					<div>
						<h4>Rozsah čísel v příkladu:</h4>
						<label htmlFor='min-num'>Od </label>
						<input
							className={styles.textInput}
							type='text'
							id='min-num'
							value={minNum}
							onChange={(e) => setMinNum(e.target.value)}
						/>
						<label htmlFor='max-num'> do </label>
						<input
							className={styles.textInput}
							type='text'
							id='max-num'
							value={maxNum}
							onChange={(e) => setMaxNum(e.target.value)}
						/>
					</div>
					<div>
						<h4>Rozsah výsledku:</h4>
						<label htmlFor='min-res'>Od </label>
						<input
							className={styles.textInput}
							type='text'
							id='min-res'
							value={minRes}
							onChange={(e) => setMinRes(e.target.value)}
						/>
						<label htmlFor='max-res'> do </label>
						<input
							className={styles.textInput}
							type='text'
							id='max-res'
							value={maxRes}
							onChange={(e) => setMaxRes(e.target.value)}
						/>
					</div>
					<div className={styles.numEx}>
						<label
							className={styles.label}
							htmlFor='numEx'
						>
							Počet příkladů:{" "}
							<input
								className={styles.textInput}
								type='text'
								id='numEx'
								value={numEx}
								onChange={(e) => setNumEx(e.target.value)}
							/>
						</label>
					</div>
					<div>
						<p className={styles.label}>Typ hodnocení:</p>
						<div className={styles.radioBox}>
							<label htmlFor='percentage'>
								<input
									type='radio'
									id='percentage'
									value='percentage'
									checked={ratingType === "percentage"}
									onChange={(e) => setRatingType(e.target.value)}
								/>
								Procenta
							</label>

							<label htmlFor='grade'>
								<input
									type='radio'
									id='grade'
									value='grade'
									checked={ratingType === "grade"}
									onChange={(e) => setRatingType(e.target.value)}
								/>
								Známka jako ve škole
							</label>
						</div>
					</div>
					<div className={styles.btnBox}>
						<button className='btn'>Spustit příklady</button>
					</div>
				</form>
			</div>
		</div>
	)
}
