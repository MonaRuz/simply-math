import styles from "./Result.module.css"
import { BsEmojiTear,BsEmojiFrown,BsEmojiNeutral,BsEmojiSmile,BsEmojiSunglasses  } from "react-icons/bs";

export default function Result({
	onReset,
	ratingType,
	correctCounter,
	wrongCounter
}) {

	//výpočet procentuální úspěšnosti po dokončení příkladů
	const percentage = Math.floor(
		(correctCounter / (correctCounter + wrongCounter)) * 100
	)

	//přiřazení známek k %
	function getGrade(percentage) {
		let grade
		if (percentage <= 20) grade = 5
		if (percentage > 20 && percentage <= 40) grade = 4
		if (percentage > 40 && percentage <= 60) grade = 3
		if (percentage > 60 && percentage <= 80) grade = 2
		if (percentage > 80) grade = 1
		return grade
	}
	//uložení známky do proměnné
	const grade = getGrade(percentage)

	

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
			<div className={styles.emoji}>
				{grade===5 && <BsEmojiTear/>}
				{grade===4 && <BsEmojiFrown/>}
				{grade===3 && <BsEmojiNeutral/>}
				{grade===2 && <BsEmojiSmile/>}
				{grade===1 && <BsEmojiSunglasses />}
			</div>
			<button
				className='btn'
				onClick={onReset}
			>
				Další příklady
			</button>
		</div>
	)
}
