import useExamples from "./hooks/useExamples"
import { useEffect } from "react"
import useFocus from "./hooks/useFocus"
import Result from "./Result"
import styles from "./Examples.module.css"
import useLocalStorage from "./hooks/useLocalStorage"

export default function Examples({ onReset }) {
	//hook k přijmutí dat z local storage
	const[settings,setSettings]=useLocalStorage([],"settings")

	//destructuring dat z local storage
	const { type, numEx, ratingType } = settings

	//volání hooku na focus pro input u příkladu
	const [inputRef, setInputFocus] = useFocus()

	setInputFocus()

	//volání hooku pro tvorbu příkladu
	const {
		firstNum,
		secondNum,
		result,
		setResult,
		handleResult,
		correctCounter,
		wrongCounter,
		randomNumbers,
	} = useExamples(settings)

	function handleBack() {
		onReset()
	}

	useEffect(
		function () {
			randomNumbers()
		},
		[randomNumbers]
	)

	if (Number(numEx) === correctCounter)
		return (
			<Result
				onReset={onReset}
				ratingType={ratingType}
				correctCounter={correctCounter}
				wrongCounter={wrongCounter}
			/>
		)

	return (
		<div className={styles.exampleBox}>
			<div className={styles.example}>
				<p className={styles.numbers}>
					{firstNum} {type} {secondNum} =
				</p>
				<input
					ref={inputRef}
					autoFocus
					className={styles.input}
					type='text'
					value={result}
					onChange={(e) => setResult(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleResult()
					}}
				/>
			</div>
			<div className={styles.btnBox}>
				<button
					className='btn'
					onClick={handleResult}
				>
					Kontrola
				</button>
				<button
					className='btn'
					onClick={handleBack}
				>
					Zpět
				</button>
			</div>
		</div>
	)
}
