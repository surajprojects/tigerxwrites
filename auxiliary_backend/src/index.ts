import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// app.use("/auth", authRouter);
// app.use("/blogs", blogsRouter);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Auxiliary Backend Home" });
});

app.all("*", async (req, res) => {
  res.status(400).json({ message: "Bad Request" });
});

app.listen(PORT, () => {
  console.log(`SERVING ON PORT ${PORT}!!!`);
});
