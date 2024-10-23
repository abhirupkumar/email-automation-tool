import { Queue, Worker } from 'bullmq';

// Create a Queue
export const emailQueue = new Queue('emailQueue', {
    connection: {
        host: 'localhost', // Redis connection
        port: 6379,
    },
});

// Create a Worker
export const emailWorker = new Worker(
    'emailQueue',
    async job => {
        console.log('Processing job:', job.data);
        // Process the job (email classification or response sending)
    },
    {
        connection: {
            host: 'localhost',
            port: 6379,
        },
    }
);
