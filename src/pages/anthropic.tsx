import React, { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';
import { Completion, CompletionCreateParams } from '@anthropic-ai/sdk/resources';

const ApiCallComponent = () => {
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApiCall = async () => {
    setIsLoading(true);

    // Create a new instance of Anthropic with your API key
    const anthropic = new Anthropic({
      apiKey: 'my api key', // Replace with your actual API key or use process.env.ANTHROPIC_API_KEY
    });

    // Define the API call parameters
    const params: CompletionCreateParams = {
      prompt: `${Anthropic.HUMAN_PROMPT} how does a court case get to the Supreme Court?${Anthropic.AI_PROMPT}`,
      max_tokens_to_sample: 300,
      model: 'claude-2',
    };

    try {
      // Make the API call
      const completion: Completion = await anthropic.completions.create(params);
      setResponseText(completion.toString());
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>API Response:</h1>
      <p>{responseText}</p>
      <button onClick={handleApiCall} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Trigger API Call'}
      </button>
    </div>
  );
};

export default ApiCallComponent;