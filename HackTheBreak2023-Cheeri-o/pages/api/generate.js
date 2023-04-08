import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const jobTitle = req.body.jobTitle || '';
  const skills = req.body.skills || '';
  const pastJobs = req.body.pastJobs || '';
  const duration = req.body.duration || '';
  const jobDescription = req.body.jobDescription || '';
  const name = req.body.name || '';
  const scrapedJob = '';

  if (jobTitle.trim().length === 0 || skills.trim().length === 0 || pastJobs.trim().length === 0 
  || duration.trim().length === 0 || jobDescription.trim().length === 0 || name.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter all the required fields",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(jobTitle, skills, pastJobs, duration, jobDescription, name, scrapedJob),
      temperature: 0.99,
      max_tokens: 300,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

export function generatePrompt(jobTitle, skills, pastJobs, duration, jobDescription, name, scrapedJob) {
  const prompt = `Write a cover letter for this job: ${jobTitle}.

  Required skills: ${skills}.

  Past job positions: ${pastJobs}.

  Duration: ${duration}.

  Job description: ${jobDescription} + ${scrapedJob}.

  Please sign off the cover letter with ${name}.

  Address it to Hiring Manager and make it a little more unique.
  `;

  return prompt;
}
