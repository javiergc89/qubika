const bearerToken = process.env.TOKEN;

// Check if the bearer token is defined
if (!bearerToken) {
  throw new Error('Bearer token is not provided');
}

export const axiosConfig = {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  };