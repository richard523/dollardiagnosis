import { z } from "zod";


import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { AnthropicStream } from "ai";




export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `A ${input.text}`,
      };
    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.example.findMany();
  // }),

  

  getSecretMessage: protectedProcedure.query(() => {
    return "Upload your essay here!";
  }),

  // External API Call Procedure
  
  // fetchExternalData: publicProcedure
  // .input(z.object({ apiUrl: z.string() }))
  // .query(async ({ input }) => {
  //   try {
  //     const { apiUrl } = input; // Destructure the apiUrl from input

  //     // Make an external API call using fetch
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-api-key': env.ANTHROPIC_API_KEY,
  //         'anthropic-version': '2023-06-01',
  //       },
  //       body: JSON.stringify({
  //         model: 'claude-v2',
  //         max_tokens_to_sample: 300,
  //         temperature: 0.9,
  //         stream: true,
  //       }),
  //     });

  //     // Check if the response status is OK
  //     if (!response.ok) {
  //       throw new Error('External API request failed');
  //     }

  //     // Convert the response into a friendly text-stream
  //     const stream = AnthropicStream(response);

  //     // Respond with the stream
  //     return new StreamingTextResponse(stream);
  //   } catch (error) {
  //     // Handle errors here
  //     throw new Error("Failed to fetch external data");
  //   }
  // }),

  anthropicComplete: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      // Make a request to the Anthropic API
      const response = await fetch('https://api.anthropic.com/v1/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          prompt: input.prompt,
          model: 'claude-v2',
          max_tokens_to_sample: 300,
          temperature: 0.9,
          stream: true,
        }),
      });
      
      // Convert the response into a friendly text-stream (you may need to define AnthropicStream)
      const stream = AnthropicStream(response);
      console.log(response)
      // Return the stream or handle it as needed
      return stream;
    }),

});
