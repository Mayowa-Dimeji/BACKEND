/*  
# Single parameter -> 200, array with Alice
regression tests 
curl -i "http://localhost:3000/api/user"          # 200, array of both users
curl -i "http://localhost:3000/api/user?id=1"     # 200, single object



curl -i "http://localhost:3000/api/user?name=alice"

# Case-insensitivity -> 200
curl -i "http://localhost:3000/api/user?name=ALICE"

# Combined, matching -> 200, single Alice object
curl -i "http://localhost:3000/api/user?id=1&name=alice"

# Combined, mismatch -> 404
curl -i "http://localhost:3000/api/user?id=1&name=bob"

# Error contract
curl -i "http://localhost:3000/api/user?id=abc"            # 400 Invalid Id
curl -i "http://localhost:3000/api/user?name="             # 400 Invalid Name
curl -i "http://localhost:3000/api/user?name=zzz"          # 404 User not found
curl -i "http://localhost:3000/api/user?id=99"             # 404


*/
import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample user profile
const users = [
  {
    id: 1,
    name: "Alice Testington",
    email: "alice.testington@example.test",
    role: "Software Developer",
    city: "Testville",
  },
  {
    id: 2,
    name: "Bob Placeholder",
    email: "bob.placeholder@example.test",
    role: "Product Manager",
    city: "Samplewick",
  },
  {
    id: 3,
    name: "Charlie Fakename",
    email: "charlie.fakename@example.test",
    role: "Data Analyst",
    city: "Mockton",
  },
  {
    id: 4,
    name: "Dana Dummydata",
    email: "dana.dummydata@example.test",
    role: "UX Designer",
    city: "Fictionburg",
  },
  {
    id: 5,
    name: "Eddie Lorem-Ipsum",
    email: "eddie.loremipsum@example.test",
    role: "DevOps Engineer",
    city: "Placeholder City",
  },
  {
    id: 6,
    name: "Alice Mockwell",
    email: "alice.mockwell@example.test",
    role: "QA Engineer",
    city: "Mockton",
  },
  {
    id: 7,
    name: "Frank Sampleton",
    email: "frank.sampleton@example.test",
    role: "Backend Developer",
    city: "Testville",
  },
  {
    id: 8,
    name: "Gina Notreal",
    email: "gina.notreal@example.test",
    role: "Frontend Developer",
    city: "Samplewick",
  },
  {
    id: 9,
    name: "Harry Imaginary",
    email: "harry.imaginary@example.test",
    role: "Data Scientist",
    city: "Fictionburg",
  },
  {
    id: 10,
    name: "Ivy Foobarbaz",
    email: "ivy.foobarbaz@example.test",
    role: "Technical Writer",
    city: "Placeholder City",
  },
];
// Basic health-check endpoint
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "User API is running",
    status: "OK",
  });
});

// Existing user endpoint
app.get("/api/user", (_req: Request, res: Response) => {
  const { id, name } = _req.query;

  if (id === undefined && name === undefined) {
    return res.json(users);
  }

  if (id !== undefined) {
    if (typeof id !== "string" || !/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({ error: "Invalid Id" });
    }
  }

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Invalid Name" });
    }
  }

  const idnum = id !== undefined ? Number(id) : undefined;
  const namequery =
    name !== undefined ? (name as string).trim().toLowerCase() : undefined;

  const results = users.filter((user) => {
    const idcheck = idnum === undefined || user.id === idnum;
    const namecheck =
      namequery === undefined || user.name.toLowerCase().includes(namequery);
    return idcheck && namecheck;
  });

  if (results.length === 0) {
    return res.status(404).json({ error: "User Not Found" });
  }

  if (idnum !== undefined) {
    return res.json(results[0]);
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
