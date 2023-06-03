// React
import { useState } from "react";

// Components
import ChatBubble from "@/components/ChatBubble";
import QuestionInput from "@/components/QuestionInput";
import { ChatObject } from "@/components/ChatBubble"; // Interface

// Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const originalAIChatObject: ChatObject = {
	id: 1,
	from: "ai",
	chatText: `Hello! I'm a helpful assistant trained on "How To Get Rich" by Naval Ravikant. What would you like to know?`,
};

export default function Home() {
	const [userInput, setUserInput] = useState<string>("");
	const [chatHistory, setChatHistory] = useState<ChatObject[]>([]);

	return (
		<main className="my-12 mx-96">
			<div className="flex justify-center pb-16">
				<h1 className="font-bold text-4xl">
					How To Get Rich by Naval Ravikant
				</h1>
			</div>
			<div className="bg-gray-800 rounded-2xl p-8">
				<div className="text-xl">
					<ChatBubble
						id={originalAIChatObject.id}
						from={originalAIChatObject.from}
						chatText={originalAIChatObject.chatText}
					/>
					{chatHistory.map((chatMsg: ChatObject) => {
						return (
							<ChatBubble
								key={chatMsg.id}
								id={chatMsg.id}
								from={chatMsg.from}
								chatText={chatMsg.chatText}
							/>
						);
					})}
				</div>
				<QuestionInput
					userInput={userInput}
					setUserInput={setUserInput}
					chatHistory={chatHistory}
					setChatHistory={setChatHistory}
				/>
			</div>
		</main>
	);
}
