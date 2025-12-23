//middleware.auth.middleware.js

import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];
    const hasRole = userRoles.some(r => allowedRoles.includes(r));
    if (!hasRole) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}