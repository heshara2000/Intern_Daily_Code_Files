// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');


// const Redis = require('ioredis');
// const cors = require('cors');
// const helmet = require('helmet');
// const postRoutes = require('./routes/post-routes');

// const errorHandler = require('./middleware/error-handler');
// const logger = require('./utils/loggers');
// const PORT = process.env.PORT || 3002;

// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     logger.info('Connected to MongoDB');
// })
// .catch((e) => {
//     logger.error(e);
// });

// const redisClient = new Redis(process.env.REDIS_URL);


// //middleware
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   logger.info(`Received ${req.method} request to ${req.url}`);
//   logger.info(`Request body, ${req.body}`);
//   next();
// });


// //implement Ip based rate limiting for sensitive endpoints


// //routes
// app.use('/api/posts', (req,res,next) => {
//     req.redisClient = redisClient;
//     next();
// }, postRoutes);

// app.use(errorHandler);
// app.listen(PORT, () => {
//     logger.info(`Server running on port ${PORT}`);
// });
// //   },
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const cors = require('cors');
const helmet = require('helmet');
const postRoutes = require('./routes/post-routes');

const errorHandler = require('./middleware/error-handler');
const logger = require('./utils/loggers');
const PORT = process.env.PORT || 3002;

const app = express();  // Initialize the Express app

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((e) => {
    logger.error(e);
  });

const redisClient = new Redis(process.env.REDIS_URL);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${JSON.stringify(req.body)}`);
  next();
});

// Implement IP-based rate limiting for sensitive endpoints here (if needed)

// Routes
app.use('/api/posts', (req, res, next) => {
  req.redisClient = redisClient;
  next();
}, postRoutes);

app.use(errorHandler);

async function startServer() {
  try {
    await connectToRabbitMQ();
    app.listen(PORT, () => {
      logger.info(`Post service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to server", error);
    process.exit(1);
  }
}

startServer();

//unhandled promise rejection

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at", promise, "reason:", reason);
});
