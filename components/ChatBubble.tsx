interface ChatBubbleProps {
	from: "ai" | "human";
	chatText: string;
}

export default function ChatBubble({ from, chatText }: ChatBubbleProps) {
	return (
		<div
			className={`chat ${
				from === "ai" ? "chat-start" : "chat-end"
			} max-w-2xl`}
		>
			<div className="chat-header opacity-50">
				{from === "ai" ? "How To Get Rich Bot" : "Me"}
			</div>
			<div className="chat-bubble">{chatText}</div>
		</div>
	);
}
