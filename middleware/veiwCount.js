let count = 0;
const viewCount = (req, res, next) => {
  count++;
  console.log(count);

  //res.send("members found")
  next();
};

module.exports = viewCount;
