const app = require('./lib/app');
const PORT = 7890;


app.listen(PORT, () => {
  console.log(`started on PORT ${PORT}`);
});
