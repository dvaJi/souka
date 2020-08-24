export async function getChapter(uniqid: string): Promise<any> {
  const url = `http://localhost:8000/v1/chapter/${uniqid}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
