document.getElementById("bettingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const winOdds = parseFloat(document.getElementById("winOdds").value);
  const drawOdds = parseFloat(document.getElementById("drawOdds").value);
  const lossOdds = parseFloat(document.getElementById("lossOdds").value);
  const totalAmount = parseFloat(document.getElementById("totalAmount").value);
  const riskLevel = document.getElementById("riskLevel").value;

  // Calculate bet distribution based on risk level
  let winPercent, drawPercent, lossPercent;

  switch (riskLevel) {
    case "low":
      winPercent = 0.4;
      drawPercent = 0.3;
      lossPercent = 0.3;
      break;
    case "medium":
      winPercent = 0.5;
      drawPercent = 0.25;
      lossPercent = 0.25;
      break;
    case "high":
      winPercent = 0.6;
      drawPercent = 0.2;
      lossPercent = 0.2;
      break;
    case "minimize":
      // Calculate percentages to ensure maximum 5% loss
      const maxLossPercent = 0.05; // 5% maximum loss

      // Calculate optimal distribution based on odds
      const totalOdds = winOdds + drawOdds + lossOdds;
      winPercent = winOdds / totalOdds;
      drawPercent = drawOdds / totalOdds;
      lossPercent = lossOdds / totalOdds;

      // Calculate potential losses for each scenario
      const winLoss = (1 - winOdds) * winPercent;
      const drawLoss = (1 - drawOdds) * drawPercent;
      const lossLoss = (1 - lossOdds) * lossPercent;

      // Adjust percentages if any loss exceeds 5%
      if (Math.max(winLoss, drawLoss, lossLoss) > maxLossPercent) {
        const adjustmentFactor =
          maxLossPercent / Math.max(winLoss, drawLoss, lossLoss);
        winPercent *= adjustmentFactor;
        drawPercent *= adjustmentFactor;
        lossPercent *= adjustmentFactor;

        // Redistribute remaining percentage
        const totalPercent = winPercent + drawPercent + lossPercent;
        const remainingPercent = 1 - totalPercent;

        // Distribute remaining percentage proportionally
        winPercent += (remainingPercent * winOdds) / totalOdds;
        drawPercent += (remainingPercent * drawOdds) / totalOdds;
        lossPercent += (remainingPercent * lossOdds) / totalOdds;
      }
      break;
  }

  // Calculate amounts
  const winAmount = totalAmount * winPercent;
  const drawAmount = totalAmount * drawPercent;
  const lossAmount = totalAmount * lossPercent;

  // Calculate potential returns
  const potentialWinReturn = winAmount * winOdds;
  const potentialDrawReturn = drawAmount * drawOdds;
  const potentialLossReturn = lossAmount * lossOdds;

  // Display results
  document.getElementById("winAmount").textContent = winAmount.toFixed(2);
  document.getElementById("drawAmount").textContent = drawAmount.toFixed(2);
  document.getElementById("lossAmount").textContent = lossAmount.toFixed(2);
  document.getElementById("potentialReturn").textContent = Math.max(
    potentialWinReturn,
    potentialDrawReturn,
    potentialLossReturn
  ).toFixed(2);

  // Show results
  document.getElementById("results").classList.remove("hidden");

  // Calculate scenario outcomes
  const winScenarioReturn = winAmount * winOdds;
  const drawScenarioReturn = drawAmount * drawOdds;
  const lossScenarioReturn = lossAmount * lossOdds;

  // Win scenario
  document.getElementById("winBetAmount").textContent = totalAmount.toFixed(2);
  document.getElementById("winScenarioReturn").textContent =
    winScenarioReturn.toFixed(2);
  document.getElementById("winScenarioProfit").textContent = (
    winScenarioReturn - totalAmount
  ).toFixed(2);

  // Draw scenario
  document.getElementById("drawBetAmount").textContent = totalAmount.toFixed(2);
  document.getElementById("drawScenarioReturn").textContent =
    drawScenarioReturn.toFixed(2);
  document.getElementById("drawScenarioProfit").textContent = (
    drawScenarioReturn - totalAmount
  ).toFixed(2);

  // Loss scenario
  document.getElementById("lossBetAmount").textContent = totalAmount.toFixed(2);
  document.getElementById("lossScenarioReturn").textContent =
    lossScenarioReturn.toFixed(2);
  document.getElementById("lossScenarioProfit").textContent = (
    lossScenarioReturn - totalAmount
  ).toFixed(2);

  // Show scenarios
  document.getElementById("scenarios").classList.remove("hidden");
});

// Add this after your existing event listener

document
  .getElementById("calculateCustom")
  .addEventListener("click", function () {
    const winOdds = parseFloat(document.getElementById("winOdds").value);
    const drawOdds = parseFloat(document.getElementById("drawOdds").value);
    const lossOdds = parseFloat(document.getElementById("lossOdds").value);

    const customWinBet =
      parseFloat(document.getElementById("customWinBet").value) || 0;
    const customDrawBet =
      parseFloat(document.getElementById("customDrawBet").value) || 0;
    const customLossBet =
      parseFloat(document.getElementById("customLossBet").value) || 0;

    const totalCustomBet = customWinBet + customDrawBet + customLossBet;

    // Calculate returns for each scenario
    const winScenario = {
      return: customWinBet * winOdds,
      profit: customWinBet * winOdds - totalCustomBet,
    };

    const drawScenario = {
      return: customDrawBet * drawOdds,
      profit: customDrawBet * drawOdds - totalCustomBet,
    };

    const lossScenario = {
      return: customLossBet * lossOdds,
      profit: customLossBet * lossOdds - totalCustomBet,
    };

    // Update UI
    document.getElementById("customWinReturn").textContent =
      winScenario.return.toFixed(2);
    document.getElementById("customWinProfit").textContent =
      winScenario.profit.toFixed(2);

    document.getElementById("customDrawReturn").textContent =
      drawScenario.return.toFixed(2);
    document.getElementById("customDrawProfit").textContent =
      drawScenario.profit.toFixed(2);

    document.getElementById("customLossReturn").textContent =
      lossScenario.return.toFixed(2);
    document.getElementById("customLossProfit").textContent =
      lossScenario.profit.toFixed(2);

    document.getElementById("customResults").classList.remove("hidden");
  });
