// pages/api/your-api-route.js



export default async (req, res) => {
    try {
      // Make your API call here
      const response = await fetch('https://api.example.com/your-endpoint');
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };