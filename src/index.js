
import 'dotenv/config';

import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
    try {
        const assistant = await openai.beta.assistants.create({
            name: "Schola Chatbot",
            instructions: `You are a chatbot that helps answers questions about our company Schola. You can answer questions about the company itself as well as the schools we partner with. All the information about the company and schools are provided in the documents I provide. If you are unsure about an answer, you can say "I don't know how to answer that.". do not use numbers to cite the documents you have been trained on. do not answer questions not related to Schola or schools Schola is related to. If you are asked a question you arent supposed to answer respond with "I am sorry, but I can only answer questions about Schola".`,
            tools: [{ type: "file_search" }],
            model: "gpt-3.5-turbo-0125",
        });

        const fileStreams = await fs.readdirSync("data").map((file) => fs.createReadStream(`data/${file}`));

        let vectorStore = await openai.beta.vectorStores.create({ name: "schola-documents" });

        await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {files: fileStreams});

        await openai.beta.assistants.update(assistant.id, {
            tool_resources: { file_search: { vector_store_ids: vectorStore.id } }
        })
    } catch (e) {
        console
    }
}

main();
