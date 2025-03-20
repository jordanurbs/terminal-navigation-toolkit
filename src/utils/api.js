import axios from 'axios';

// Create an axios instance with the API key
const api = axios.create({
  baseURL: 'https://ccc.ai-captains.com/.netlify/functions',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.CAPTAINS_TOOLKIT_API_KEY
  }
});

// Add API key to requests if available
api.interceptors.request.use(config => {
  const apiKey = import.meta.env.CAPTAINS_TOOLKIT_API_KEY;
  
  if (apiKey) {
    console.log('Adding API key to request:', apiKey);
    config.headers['x-api-key'] = apiKey;
  } else {
    console.log('No API key available for request');
  }
  
  // Log the final headers for debugging
  console.log('Request headers:', config.headers);
  
  return config;
});

// API functions
export const validateApiKey = async (apiKey) => {
  try {
    const response = await fetch('https://ccc.ai-captains.com/.netlify/functions/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    });
    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('API key validation error:', error);
    return false;
  }
};

// Mock functions for type consistency
export const fetchChallenges = async () => {
  return { success: true, data: [] };
};

export const updateProgress = async () => {
  return { success: true };
};

export const getProgress = async () => {
  return { success: true, data: [] };
};

export default api; 