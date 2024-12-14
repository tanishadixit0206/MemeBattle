
export const fetchMeme = async () => {
  try {
    
    const response = await fetch('url to be called', { //! url to be added
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data || !data.memeUrl) {
      throw new Error('Invalid meme data received');

    }

    return data.memeUrl 

  } catch (error) {
    console.log(error)
  }
};