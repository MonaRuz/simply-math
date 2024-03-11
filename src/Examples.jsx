import useExamples from "./hooks/useExamples"
import { useEffect } from "react"
import useFocus from "./hooks/useFocus"
import Result from "./Result"
import styles from "./Examples.module.css"

export default function Examples({ onReset }) {
	//přijmutí dat z local storage
	const data = localStorage.getItem("settings")
	const settings = JSON.parse(data)

	//destructuring dat z local storage
	const { type, minNum, maxNum, minRes, maxRes, numEx, ratingType } = settings

	//volání hooku na focus pro input u příkladu
	const [inputRef, setInputFocus] = useFocus()

	setInputFocus()

	//volání hooku pro zpracování dat
	const {
		firstNum,
		secondNum,
		result,
		setResult,
		handleResult,
		correctCounter,
		rating,
		randomNumbers,
	} = useExamples(type, minNum, maxNum, minRes, maxRes)

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
				rating={rating}
				ratingType={ratingType}
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
			<button
				className='btn'
				onClick={handleResult}
			>
				Kontrola
			</button>
		</div>
	)
}
