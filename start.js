const {app, url, connectDB} = require("./server");

const PORT = process.env.PORT || 4000

const start = async () => {
  try {
    const db = await connectDB(url);
    if(db) console.log('connect to db')
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();