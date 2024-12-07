import db from "./initializers/db.js";
import app from "./initializers/express-app.js"

// Default Port 3000 unless specified in .env
const PORT = process.env.PORT || 3000;
db.execute;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
