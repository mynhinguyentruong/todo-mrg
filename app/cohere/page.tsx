
import cohere from 'cohere-ai'

cohere.init(process.env.COHERE_TRIAL_KEY as string); // This is your trial API key

// const test = async () => {
//   const response = await cohere.generate({
//     model: 'command',
//     prompt: 'Write a list of todo to setup a project in Golang',
//     num_generations: 5,
//     max_tokens: 300,
//     temperature: 0.9,
//     k: 0,
//     stop_sequences: [],
//     return_likelihoods: 'NONE'
//   });
//
//   for (const res of response.body.generations) {
//     console.log(res.text)
//   }
//   return response
// };

const embeded = async () => {

  const response = await cohere.embed({
    model: 'embed-english-v2.0',
    texts: ["Who is seeking a cofounder?", "Did your YC (or other incubator) startup fail? What are you doing now?", "Obtaining initial users for a startup", "Which successful startups were rejected by YC?", "Is there VC appetite for defence related startups?", "Did reading HN bring anything valuable into your life?", "What are some of the best HN comments that you\'ve read?", "What is your favorite HN post?", "Did reading HN bring anything valuable into your life?", "What is your favourite tech talk?", "What\'s the best technical eBook you have read?", "Do you know any good audio books for developers?", "As a technical founder what is the best business book you\'ve read?", "Is it just me or did Google search recently get a lot worse?", "Is Someone Hijacking Google Images?", "What\'s Up with Google?", "Google removed my site from search results, what can I do?", "Passive income ideas?", "How do you create productive habits?", "What is your passive income 2021?", "What are your passive income sources?", "Do you know any good audio books for developers?", "Interesting (Non software) books?", "Non-tech books that have helped you grow professionally?", "Which books teach mental models?", "Anxiety is limiting my enjoyment of a wonderful career. Can you relate?", "Should I quit the field of software development?", "Did your life as a parent affected your life as a developer?", "Is it normal to fall out of love with coding?", "I made $24k over the last month. Now what?", "What is a way of making residual income with $5K a month?", "What kind of personal financial investment do you do?", "I sold my company last month for $5m. What do I do with the money?", "How do you all deal with lack of motivation?", "How do I stay motivated to learn?", "How to keep yourself accountable?", "How are you getting through (and back from) burning out?", "What are your favourite non-fiction books of all time?"]
  });
  console.log(`Embeddings: ${response.body.embeddings}`);
}

export default async function Page() {
  // const res = await test()
  const res = await embeded()

  return <>{JSON.stringify(res)}</>


}
