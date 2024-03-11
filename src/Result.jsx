import styles from "./Result.module.css"

export default function Result({
	onReset,
	rating,
	ratingType,
}) {

	//destructuring prop
	const { percentage, grade } = rating


	return (
		<div className={styles.resultBox}>
			{ratingType === "percentage" && (
				<>
					<p>Odpověděl(a) jsi správně v</p>
					<p className={styles.result}>{percentage} %</p>
				</>
			)}
			{ratingType === "grade" && (
				<>
					<p>Tvoje známka je </p>
					<p className={styles.result}>{grade}</p>
				</>
			)}
			<button
				className='btn'
				onClick={onReset}
			>
				Další příklady
			</button>
		</div>
	)
}
