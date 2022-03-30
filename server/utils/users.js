const switchTurn = (currentTurn) => {
  if (currentTurn === "X") {
    return "O";
  } else {
    return "X";
  }
};

module.exports = {
  switchTurn,
};
