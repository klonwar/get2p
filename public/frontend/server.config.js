const dev = location.hostname.includes(`localhost`);

export const SERVER_BASE = (dev) ? `https://localhost:3000/api/v1` : `https://get2p.herokuapp.com/api/v1`;
