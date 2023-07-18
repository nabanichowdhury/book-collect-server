import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from "http-status";
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app:Application = express()
//middleWares
app.use(cors())

//parser
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//application route
app.use('/api/v1', routes);

app.get('/', (req:Request, res:Response) => {
  res.send('Database Connected')
})
//global error handler

app.use(globalErrorHandler);


//NO FOUND ROUTE

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app

