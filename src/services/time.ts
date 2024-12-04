import axios from 'axios';

export async function getWorkingTime() {
  const res = await axios.get('https://api.npoint.io/40decae12b7e09baf42f');
  return res.data;
}
