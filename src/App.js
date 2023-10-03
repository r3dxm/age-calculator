import { useState } from "react";
import "./App.css";
import ButtonIcon from "./images/icon-arrow.svg";
import { DateTime } from "luxon";
import CountUp from "react-countup";

function App() {
	const [invalid, setInvalid] = useState(false);
	const [inputDay, setInputDay] = useState("");
	const [futureDay, setFutureDay] = useState(false);
	const [emptyDay, setEmptyDay] = useState(false);
	const [invalidDay, setInvalidDay] = useState(false);
	const [inputMonth, setInputMonth] = useState("");
	const [futureMonth, setFutureMonth] = useState(false);
	const [emptyMonth, setEmptyMonth] = useState(false);
	const [invalidMonth, setInvalidMonth] = useState(false);
	const [inputYear, setInputYear] = useState("");
	const [futureYear, setFutureYear] = useState(false);
	const [emptyYear, setEmptyYear] = useState(false);
	const [invalidYear, setInvalidYear] = useState(false);
	const [outputYears, setOutputYears] = useState();
	const [outputMonths, setOutputMonths] = useState();
	const [outputDays, setOutputDays] = useState();

	async function handleSubmit() {
		isNaN(inputDay) ? setEmptyDay(true) : setEmptyDay(false);
		isNaN(inputMonth) ? setEmptyMonth(true) : setEmptyMonth(false);
		isNaN(inputYear) ? setEmptyYear(true) : setEmptyYear(false);
		if (
			emptyDay ||
			emptyMonth ||
			emptyYear ||
			invalidDay ||
			invalidMonth ||
			invalidYear ||
			futureDay ||
			futureMonth ||
			futureYear
		) {
			setInvalid(true);
		} else setInvalid(false);

		if (!invalid) {
			const inputDate = DateTime.fromObject({
				year: parseInt(inputYear),
				month: parseInt(inputMonth),
				day: parseInt(inputDay),
			});
			const diff = DateTime.now()
				.diff(inputDate, ["years", "months", "days"])
				.toObject();
			setOutputYears(diff.years);
			setOutputMonths(diff.months);
			setOutputDays(Math.floor(diff.days));
		}
	}

	async function validateDay() {
		if (!/^\d+$/.test(inputDay)) setInputDay("");
		const parsedInputDay = parseInt(inputDay);
		var parsedInputMonth = parseInt(inputMonth);
		const parsedInputYear = parseInt(inputYear);
		//day
		setInvalid(false);
		const currentDate = new Date();
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth() + 1;
		const currentYear = currentDate.getFullYear();

		if (inputDay === "") {
			setEmptyDay(true);
			setInvalidDay(false);
		} else {
			setEmptyDay(false);
		}

		let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (
			parsedInputYear % 400 === 0 ||
			(parsedInputYear % 100 !== 0 && parsedInputYear % 4 === 0)
		) {
			monthLength[1] = 29;
		}

		if (emptyMonth) parsedInputMonth = 1;

		if (
			parsedInputDay < 1 ||
			parsedInputDay > monthLength[parsedInputMonth - 1]
		) {
			setInvalidDay(true);
		} else {
			setInvalidDay(false);
		}

		if (
			parsedInputDay > currentDay &&
			parsedInputMonth === currentMonth &&
			parsedInputYear === currentYear
		) {
			setFutureDay(true);
		} else setFutureDay(false);
		if (parsedInputMonth > currentMonth && parsedInputYear === currentYear) {
			setFutureMonth(true);
		} else setFutureMonth(false);
	}

	async function validateMonth() {
		if (!/^\d+$/.test(inputMonth)) setInputMonth("");
		const parsedInputDay = parseInt(inputDay);
		const parsedInputMonth = parseInt(inputMonth);
		const parsedInputYear = parseInt(inputYear);
		//month
		setInvalid(false);
		const currentDate = new Date();
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth() + 1;
		const currentYear = currentDate.getFullYear();

		if (inputMonth === "") {
			setEmptyMonth(true);
			setInvalidMonth(false);
		} else {
			setEmptyMonth(false);
		}

		if (parsedInputMonth < 1 || parsedInputMonth > 12) {
			setInvalidMonth(true);
		} else {
			setInvalidMonth(false);
		}

		if (
			parsedInputDay > currentDay &&
			parsedInputMonth === currentMonth &&
			parsedInputYear === currentYear
		) {
			setFutureDay(true);
		} else setFutureDay(false);
		if (parsedInputMonth > currentMonth && parsedInputYear === currentYear) {
			setFutureMonth(true);
		} else setFutureMonth(false);
	}

	async function validateYear() {
		if (!/^\d+$/.test(inputYear)) setInputYear("");
		const parsedInputYear = parseInt(inputYear);
		//year
		setInvalid(false);
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();

		if (inputYear === "") {
			setEmptyYear(true);
			setInvalidYear(false);
		} else {
			setEmptyYear(false);
		}

		if (parsedInputYear < 1900) {
			setInvalidYear(true);
		} else {
			setInvalidYear(false);
		}

		if (parsedInputYear > currentYear) {
			setFutureYear(true);
		} else {
			setFutureYear(false);
		}
	}

	return (
		<div className="App">
			<div className="calculator">
				<section className="inputSection">
					<div className={invalid ? "invalidInputContainer" : "inputContainer"}>
						<h2>DAY</h2>
						<input
							onKeyUp={validateDay}
							onChange={(e) => setInputDay(e.target.value)}
							value={inputDay}
							type="text"
							placeholder="DD"
						/>
						{emptyDay && <p>This field is required</p>}
						{invalidDay && <p>Must be a valid day</p>}
						{futureDay && <p>Must be in the past</p>}
					</div>
					<div className={invalid ? "invalidInputContainer" : "inputContainer"}>
						<h2>MONTH</h2>
						<input
							onKeyUp={validateMonth}
							onChange={(e) => setInputMonth(e.target.value)}
							value={inputMonth}
							type="text"
							placeholder="MM"
						/>
						{emptyMonth && <p>This field is required</p>}
						{invalidMonth && <p>Must be a valid month</p>}
						{futureMonth && <p>Must be in the past</p>}
					</div>
					<div className={invalid ? "invalidInputContainer" : "inputContainer"}>
						<h2>YEAR</h2>
						<input
							onKeyUp={validateYear}
							onChange={(e) => setInputYear(e.target.value)}
							value={inputYear}
							type="text"
							placeholder="YYYY"
						/>
						{emptyYear && <p>This field is required</p>}
						{invalidYear && <p>Must be a valid year</p>}
						{futureYear && <p>Must be in the past</p>}
					</div>
				</section>
				<section className="buttonSection">
					<hr />
					<button onClick={handleSubmit}>
						<img src={ButtonIcon} alt="button-icon" />
					</button>
				</section>
				<section className="outputSection">
					<CountUp start={"--"} end={outputYears} duration={2}>
						{({ countUpRef }) => (
							<h1>
								<span ref={countUpRef} /> years
							</h1>
						)}
					</CountUp>
					<CountUp start={"--"} end={outputMonths} duration={2}>
						{({ countUpRef }) => (
							<h1>
								<span ref={countUpRef} /> months
							</h1>
						)}
					</CountUp>
					<CountUp start={"--"} end={outputDays} duration={2}>
						{({ countUpRef }) => (
							<h1>
								<span ref={countUpRef} /> days
							</h1>
						)}
					</CountUp>
				</section>
			</div>
		</div>
	);
}

export default App;
