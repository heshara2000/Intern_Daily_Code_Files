import express, { Express, Request, Response, NextFunction } from "express";
import { IUser, User } from "./models/User";

const app: Express = express();
const port = 3000;

app.use(express.json());

interface CustomRequest extends Request {
  startTime?: number;
}

//middleware -> add startTime to request
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello. Typescript with express");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
  } catch (e) {
    res.status(400).json({ message: "Some error occured!" });
  }
});

//post route -> new user -> name, email -> req.body
// -> /user/:id?name -> Request <{}, {}, {},{}>

interface User {
  name: string;
  email: string;
}

app.post("/user", (req: Request<{}, {}, User>, res: Response) => {
  const { name, email } = req.body;
  res.json({
    message: `User created ${name}-${email}`,
  });
});

//users based on id
app.get("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  res.json({
    userId: id,
  });
});

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});

//basic types

// let isDone : Boolean = false;
// let num: number = 100;
// let str: string = 'sangam';

// let list: number[] = [1,2,3];
// let products:Array<string> = ["product 1", "product 2", "product 3"];

// let randomVal: any =4;
// let xyz: undefined = undefined;

// let yz: null = null;
// enum Color {
//     Red,
//     Green,
//     Blue
// }

// let d: Color = Color.Green;

//tuple
//let abc: [] = [];

//interface 
// interface User {
//     name: string;
//     id: number;
//     email? : string;
//     readonly createdAt: Date
// }


// const user: User = {
//     name: "John Doe",
//     id: 1,
//     email: "john.doe@example.com",
//     createdAt: new Date(),
// };