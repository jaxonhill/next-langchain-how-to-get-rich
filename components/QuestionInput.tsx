import { useRef, useEffect } from "react";

export default function QuestionInput() {
	const textArea = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textArea.current) {
			textArea.current.focus();
		}
	}, []);

	return (
		<div className="absolute bottom-0 w-full left-0 flex justify-center pb-16">
			<div className="form-control w-full max-w-xl">
				<textarea
					ref={textArea}
					placeholder="Type a question"
					className="textarea text-lg h-12 max-h-72 textarea-bordered w-full max-w-xl placeholder:opacity-70"
				/>
			</div>
		</div>
	);
}
