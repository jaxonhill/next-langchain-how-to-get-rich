import { Inter } from "next/font/google";
import { useRef, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const textArea = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textArea.current) {
			textArea.current.focus();
		}
	}, []);

	return (
		<main className="my-12 mx-96">
			<div className="flex justify-center pb-16">
				<h1 className="font-bold text-4xl">
					How To Get Rich by Naval Ravikant
				</h1>
			</div>
			<div className="text-xl">
				<div className="chat chat-start">
					<div className="chat-header opacity-50">
						How To Get Rich Bot
					</div>
					<div className="chat-bubble">
						Testing chat, is this working?
					</div>
				</div>
				<div className="chat chat-end">
					<div className="chat-header opacity-50">Me</div>
					<div className="chat-bubble">Yes!</div>
				</div>
			</div>
			<div className="absolute bottom-0 w-full left-0 flex justify-center pb-16">
				<div className="form-control w-full max-w-xl">
					<textarea
						ref={textArea}
						placeholder="Type a question"
						className="textarea text-lg h-12 max-h-72 textarea-bordered w-full max-w-xl placeholder:opacity-70"
					/>
				</div>
			</div>
		</main>
	);
}
