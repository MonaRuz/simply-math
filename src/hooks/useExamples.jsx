import { useState, useCallback } from "react"

export default function useExamples(type, minNum, maxNum, minRes, maxRes) {
	//první číslo v příkladu
	const [firstNum, setFirstNum] = useState("")

	//druhé číslo v příkladu
	const [secondNum, setSecondNum] = useState("")

	//výsledek příkladu
	const [result, setResult] = useState("")

	//počítadlo správných výsledků
	const [correctCounter, setCorrectCounter] = useState(0)

	//počítadlo cyb
	const [wrongCounter, setWrongCounter] = useState(0)

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

	//uložení úspěsnosti do objektu
	const rating = {
		percentage,
		grade,
	}


	//memoizace funkce pro generaci náhodných čísel
	const randomNumbers = useCallback(

		//generování pole náhodných čísel pro jeden příklad
		function randomNumbers() {
			const numArr = [
				Math.floor(Math.random() * (maxNum - minNum) + minNum),
				Math.floor(Math.random() * (maxNum - minNum) + minNum),
			]

			//rekurzivní funkce pro kontrolu a uložení náhodných čísel do state pro sčítání
			if (type === "+") {
				if (numArr[0] + numArr[1] <= maxRes) {
					setFirstNum(numArr.at(0))
					setSecondNum(numArr.at(1))
				} else {
					randomNumbers()
				}
			}

			//rekurzivní funkce pro kontrolu a uložení náhodných čísel do state pro odčítání
			if (type === "-") {

				if (numArr[0] - numArr[1] >= minRes) {
					setFirstNum(numArr.at(0))
					setSecondNum(numArr.at(1))
				} else {
					randomNumbers()
				}
			}
		},
		//dependencies
		[maxNum, maxRes, minRes, minNum, type]
	)

	//kontrola výsledku a nastavení počítadel
	//nový příklad se objeví pouze po správném výsledku
	function handleResult() {
		//validace inputu
		if (!result) return alert("Výsledek musí být vyplněn!!!")

		//kontrola výsledku při sčítání
		if (type === "+") {
			if (Number(result) === Number(firstNum) + Number(secondNum)) {
				setResult("")
				setCorrectCounter((c) => c + 1)
				randomNumbers()
			} else {
				setWrongCounter((c) => c + 1)
				setResult("")
			}
		}

		//kontrola výsledku při odčítání
		if (type === "-") {
			if (Number(result) === Number(firstNum) - Number(secondNum)) {
				setResult("")
				setCorrectCounter((c) => c + 1)
				randomNumbers()
			} else {
				setWrongCounter((c) => c + 1)
				setResult("")
			}
		}
	}

	//output
	return {
		firstNum,
		secondNum,
		result,
		setResult,
		handleResult,
		randomNumbers,
		correctCounter,
		rating,
	}
}
