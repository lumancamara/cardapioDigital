import axios from 'axios';

export async function getWorkingTime() {
  const res = await axios.get(
    'https://www.npoint.io/docs/40decae12b7e09baf42f'
  );
  return res.data;
}
