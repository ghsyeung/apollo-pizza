function unsetCookie({name, res}) {
  res.clearCookie(name);
}

function setCookie({name, value, res}) {
  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2h
  });
}

module.exports = {
  unsetCookie, setCookie,
};
