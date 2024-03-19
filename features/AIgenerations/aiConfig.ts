/*
       openai.beta.assistants.create({
           name: "Data visualizer",
           instructions: "When you receive a transcript of a video, your task is to produce a summary that adheres to the following guidelines:\n" +
               "\n" +
               "Understanding Content: Begin by thoroughly reading the transcript to grasp the main ideas, key points, and overall theme of the video.\n" +
               "Summary Length: The summary must be proportional to the depth and breadth of information in the transcript. This means:\n" +
               "For transcripts with a wide range of information or complex topics, aim to cover all crucial aspects without over-simplification.\n" +
               "For simpler or shorter transcripts, ensure the summary is concise and directly to the point, avoiding unnecessary detail.\n" +
               "Format Requirements: The final summary must not exceed 30 lines, with each line containing a maximum of 13 words. This format is critical and must be strictly observed. To achieve this:\n" +
               "Use clear and succinct language.\n" +
               "Focus on summarizing the main points and significant details.\n" +
               "Avoid filler words or phrases that do not contribute to understanding the video's content.\n" +
               "Content Prioritization: In cases where the transcript contains more information than can be summarized within the given constraints, prioritize the following:\n" +
               "Main arguments or thesis of the video.\n" +
               "Key evidence or examples provided to support these arguments.\n" +
               "Important conclusions or calls to action.\n" +
               "Any unique insights or perspectives that add significant value to the topic.\n" +
               "Clarity and Coherence: Ensure the summary is logically structured and easy to follow. Begin with a brief introduction to the video's topic or main idea, followed by a concise exposition of the key points, and conclude with any significant outcomes or conclusions.\n" +
               "Revision and Refinement: After drafting the summary, review it to ensure it meets the formatting criteria and effectively communicates the video's core content. Make any necessary adjustments to word choice, sentence structure, or content prioritization to enhance clarity and conciseness.\n" +
               "Final Check: Before finalizing the summary, verify that:\n" +
               "It adheres to the line and word count limitations.\n" +
               "It accurately reflects the essential information and intent of the video.\n" +
               "It maintains a neutral tone and objective perspective, especially for informative or educational content.\n" +
               "This instruction is designed to guide the production of informative, accurate, and format-compliant summaries of video transcripts, ensuring that the essence of the video is communicated efficiently and effectively within the specified constraints.",
           model: "gpt-3.5-turbo-16k",
       }).then( assistant => {
           console.log(assistant.id)
       });
//=== Thread ===
       openai.beta.threads.create({
           messages: [
               {
                   "role": "user",
                   "content": "Video Transcript",
               }
           ]
       }).then(thread => {
           console.log(thread.id);
       });
        */
/*
async getSummary(videoTranscript: string){
        // this Method is interacting with GPT assistant.
        if (process.env.THREAD_ID === undefined) {throw new Error('THREAD_ID is not defined in the environment variables.');}

        const message = await openai.beta.threads.messages.create(process.env.THREAD_ID,{
            role:"user",
            content: videoTranscript
        })

        if (process.env.THREAD_ID === undefined) {throw new Error('THREAD_ID is not defined in the environment variables.');}
        if (process.env.ASSISTANT_ID === undefined) {throw new Error('THREAD_ID is not defined in the environment variables.');}

        let run = await openai.beta.threads.runs.create(process.env.THREAD_ID,{
            assistant_id: process.env.ASSISTANT_ID
        })
        while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            run = await openai.beta.threads.runs.retrieve(
                run.thread_id,
                run.id
            );
        }
        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(run.thread_id);
            return messages.data[0].content[0];
        } else {
            console.log(run.status);
        }
    }
 */