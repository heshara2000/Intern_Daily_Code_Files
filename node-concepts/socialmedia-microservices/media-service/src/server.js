require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mediaRoutes = require('./routes/media-routes');
const errorHandler = require('./middleware/error-handler');
const logger = require('./utils/loggers');
const PORT = process.env.PORT || 3003;
const app = express();

mongoose
.connect(process.env.MONGO_URI)
.then(() => logger.info('Connected to MongoDB'))
.catch((e) => logger.error('connection error',e));


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Request body, ${JSON.stringify(req.body)}`);
    next();
  });


app.use('/api/media', mediaRoutes);
app.use(errorHandler);

async function startServer() {
  try {
    await connectToRabbitMQ();

    //consume
    await consumeEvent('post.deleted')
    app.listen(PORT, () => {
      logger.info(`Media service running on port ${PORT}`);
    });
  }catch(error) {
    logger.error("Failed to connect to media server", error);
    process.exit(1);
  }
}

startServer();



app.listen(PORT, () => {
    logger.info(`Post service running on port ${PORT}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at", promise, "reason:", reason);
  });
  