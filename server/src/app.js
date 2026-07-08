import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "./db.js";

const app = express();
const port = Number(process.env.PORT || 8787);
const jwtSecret = process.env.JWT_SECRET || "dev-secret-change-me";

app.use(cors());
app.use(express.json({ limit: "1mb" }));

function signUser(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, displayName: user.display_name },
    jwtSecret,
    { expiresIn: "7d" }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }
  try {
    req.auth = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
}

app.get("/api/health", function (_req, res) {
  res.json({ ok: true, service: "millions-of-miles-server" });
});

app.post("/api/auth/register", function (req, res) {
  const username = String(req.body.username || "").trim().toLowerCase();
  const displayName = String(req.body.displayName || "").trim();
  const password = String(req.body.password || "");

  if (!username || !displayName || !password) {
    return res.status(400).json({ error: "MISSING_FIELDS" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "PASSWORD_TOO_SHORT" });
  }

  const existing = db.prepare("select id from users where username = ?").get(username);
  if (existing) {
    return res.status(409).json({ error: "USERNAME_EXISTS" });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare("insert into users (username, display_name, password_hash) values (?, ?, ?)")
    .run(username, displayName, passwordHash);

  db.prepare("insert or ignore into trip_plans (user_id, plans_json) values (?, '{}')").run(result.lastInsertRowid);

  const user = db
    .prepare("select id, username, display_name from users where id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json({
    token: signUser(user),
    user: { id: user.id, username: user.username, displayName: user.display_name }
  });
});

app.post("/api/auth/login", function (req, res) {
  const username = String(req.body.username || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  const user = db.prepare("select * from users where username = ?").get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  res.json({
    token: signUser(user),
    user: { id: user.id, username: user.username, displayName: user.display_name }
  });
});

app.get("/api/auth/me", authRequired, function (req, res) {
  const user = db
    .prepare("select id, username, display_name from users where id = ?")
    .get(req.auth.sub);

  if (!user) {
    return res.status(404).json({ error: "USER_NOT_FOUND" });
  }

  res.json({
    user: { id: user.id, username: user.username, displayName: user.display_name }
  });
});

app.get("/api/plans", authRequired, function (req, res) {
  const row = db.prepare("select plans_json, updated_at from trip_plans where user_id = ?").get(req.auth.sub);
  res.json({
    plans: row ? JSON.parse(row.plans_json || "{}") : {},
    updatedAt: row ? row.updated_at : null
  });
});

app.put("/api/plans", authRequired, function (req, res) {
  const plans = req.body && typeof req.body.plans === "object" && req.body.plans ? req.body.plans : {};
  db.prepare(
    `insert into trip_plans (user_id, plans_json, updated_at)
     values (?, ?, datetime('now'))
     on conflict(user_id) do update set
       plans_json = excluded.plans_json,
       updated_at = excluded.updated_at`
  ).run(req.auth.sub, JSON.stringify(plans));

  res.json({ ok: true });
});

app.listen(port, function () {
  console.log("millions-of-miles server listening on http://localhost:" + port);
});
