export interface ChatObject {
	id: number;
	from: "ai" | "human";
	chatText: string;
}

export default function ChatBubble({ id, from, chatText }: ChatObject) {
	return (
		<div className={`chat ${from === "ai" ? "chat-start" : "chat-end"}`}>
			<div className="chat-header opacity-50">
				{from === "ai" ? "How To Get Rich Bot" : "Me"}
			</div>
			<div className="chat-bubble">{chatText}</div>
		</div>
	);
}
