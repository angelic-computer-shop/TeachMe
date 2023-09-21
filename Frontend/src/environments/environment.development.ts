const gptUrl: string = 'https://banklingoapi.onrender.com/api/gpt';
export const environment = {
  askGPTinsideTopic: `${gptUrl}/insideTopic`,
  getTopics: `${gptUrl}/getTopicsById`,
  updateCovered: `${gptUrl}/update_covered`,
  incrementDays: `${gptUrl}/update_days`
};
