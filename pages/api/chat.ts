import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss"
import { HumanChatMessage, AIChatMessage, SystemChatMessage, ChatMessage } from "langchain/schema";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferWindowMemory, ChatMessageHistory } from "langchain/memory";
import { ChatObject } from '@/components/ChatBubble';
import path from "path";

type Data = {
  data: string
  chatHistory: ChatObject[],
}

const VECTOR_STORE_FILE_PATH: string = path.resolve("./public/how_to_get_rich.index");

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const userInput = req.body.userInput;
    let chatHistory: ChatObject[] = req.body.chatHistory;
    chatHistory = chatHistory.slice(1)  // Remove first message, just informs user it is AI

    try {
        // Get OpenAI API key, load chat model
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        const chatModel = new ChatOpenAI({ 
            modelName: "gpt-3.5-turbo", 
            openAIApiKey: OPENAI_API_KEY 
        });

        // Create embeddings object we want to utilize
        const embeddingsModel = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY });

        // Load the vector store from memory
        const vectorStore = FaissStore.load(VECTOR_STORE_FILE_PATH, embeddingsModel);

        // Create a system message to tell the AI how to operate
        const originalSystemMessage = new SystemChatMessage(
        `You are a helpful assistant that answers questions about an article and book called, ` +
        `"How to Get Rich," by Naval Ravikant. You will be provided context along with the user's questions. ` +
        `If you cannot answer the question and you do not know the answer, even with the context provided, ` +
        `then state that you do not know the answer.`
        );
        
        // Loop through chat history passed in
        const cleanedChatHistory = chatHistory.map((chat) => {
            // If from ai
            if (chat.from === "ai") {
                return new AIChatMessage(chat.chatText);
            } else {
                return new HumanChatMessage(chat.chatText);
            }
        });

        // Insert the system message at the beginning
        cleanedChatHistory.unshift(originalSystemMessage);

        // Create the actual chat history LangChain object
        const finalChatHistoryObj = new ChatMessageHistory(cleanedChatHistory);

        // Create a BufferWindowMemory (will remember last k chats)
        const windowMemory = new BufferWindowMemory({
            memoryKey: "chat_history",
            chatHistory: finalChatHistoryObj,
            returnMessages: true,
        })

        console.log(finalChatHistoryObj);

        // Call the actual ConversationalRetrievalQAChain
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ data: "Something went wrong calling OpenAI API.", chatHistory: chatHistory});
    }

    // TODO: Fix and return actual values
    res.status(200).json({ data: 'John Doe', chatHistory: chatHistory });
}