// curl -i "http://localhost:3000/api/user" base Url test
import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());
// Sample user profile
const user = {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Software Developer",
    city: "Abuja",
};
// Basic health-check endpoint
app.get("/", (_req, res) => {
    res.json({
        message: "User API is running",
        status: "OK",
    });
});
// Existing user endpoint
app.get("/api/user", (_req, res) => {
    res.json(user);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
