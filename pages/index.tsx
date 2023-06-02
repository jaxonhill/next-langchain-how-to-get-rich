import { Inter } from "next/font/google";

import ChatBubble from "@/components/ChatBubble";
import QuestionInput from "@/components/QuestionInput";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
						from="ai"
						chatText={`Hello! I'm a helpful assistant trained on "How To Get Rich" by Naval Ravikant. What would you like to know?`}
					/>
				</div>
				<QuestionInput />
			</div>
		</main>
	);
}
