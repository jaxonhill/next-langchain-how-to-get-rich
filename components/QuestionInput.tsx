import { useRef, useEffect } from "react";
import { FormEvent } from "react";
import { ChatObject } from "./ChatBubble";

interface QuestionInputProps {
	userInput: string;
	setUserInput: Function;
	chatHistory: ChatObject[];
	setChatHistory: Function;
}

export default function QuestionInput({
	userInput,
	setUserInput,
	chatHistory,
	setChatHistory,
}: QuestionInputProps) {
	const textArea = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (textArea.current) {
			textArea.current.focus();
		}
	}, []);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Create new ChatObject parameters and the newChatHistory
		let newID: number = chatHistory[chatHistory.length - 1].id + 1;

		// Fetch the AI response using LangChain in internal api route
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userInput: userInput,
				chatHistory: chatHistory,
			}),
		});

		const data = await response.json();
		console.log(data);

		// TODO: Fix, have the actual final chat history here with the response from the AI as well
		setChatHistory([...chatHistory]);
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
