// utils/api.js
export async function fetchData(url, token) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }
  