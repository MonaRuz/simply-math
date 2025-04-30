import FirstNumber from "./FirstNumber"
import ResultNumber from "./ResultNumber"
import SecondNumer from "./SecondNumer"
import styles from "./ExamplesWrapper.module.css"

export default function ExamplesWrapper(props) {
	return (
		<div className={styles.wrapper}>
			<FirstNumber>{props.children[0]}</FirstNumber>
			<SecondNumer>{props.children[1]}</SecondNumer>
			<ResultNumber>{props.children[2]}</ResultNumber>
		</div>
	)
}
