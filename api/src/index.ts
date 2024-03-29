import app from './server';
import CONFIG from './config/config';
import './config/db';

const PORT = CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
