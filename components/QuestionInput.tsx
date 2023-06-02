import { useRef, useEffect } from "react";
import { FormEvent } from "react";

interface QuestionInputProps {
	userInput: string;
	setUserInput: Function;
}

export default function QuestionInput({
	userInput,
	setUserInput,
}: QuestionInputProps) {
	const textArea = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (textArea.current) {
			textArea.current.focus();
		}
	}, []);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(userInput);
		setUserInput("");
	}

	return (
		<div className="absolute bottom-0 w-full left-0 flex justify-center pb-16">
			<div className="form-control w-full max-w-xl">
				<form
					onSubmit={(e: FormEvent<HTMLFormElement>) =>
						handleSubmit(e)
					}
				>
					<input
						ref={textArea}
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						placeholder="Type a question"
						className="input input-bordered text-lg h-12 max-h-72 w-full max-w-xl placeholder:opacity-70"
					/>
				</form>
			</div>
		</div>
	);
}
