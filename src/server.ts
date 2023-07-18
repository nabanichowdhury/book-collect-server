import { Server } from 'http';
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";


let server: Server;

async function main() {
  try{
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });

    console.log("Database Connected Successfully")
    
  }catch(err){
    console.log('Failed to connect database ',err)
  }
  process.on('uncaughtException', err => {
    console.error(err)
    process.exit(1);
  });
  process.on('unhandledRejection', err => {
    console.error(err);
    if (server) {
      server.close(() => {
        console.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
    

  }
  main()

  process.on('SIGTERM', err => {
    console.info('SIGTERM is Received', err);
    if (server) {
      server.close();
    }
  });