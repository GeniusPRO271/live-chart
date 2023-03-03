# Exchange rates for two currencies

### INTRODUCTION

This simulation code simulates two exchange rates for USD and EUR with the formula C = C _ (1 + k _ (random - 0.5)), where C is the currency, k is a constant, and random is a random number between 0 and 1. The simulation is visualized using a line chart created with Chart.js and React.

### DESCRIPTION

The simulation starts by initializing the chart with an initial value of 1.06 for EUR and 1 for USD. The formula is then applied to each currency on every update, and the resulting data is added to the chart. The simulation is run every second, and the data is plotted in real-time.

While this simulation provides a basic visualization of exchange rates, it has some limitations. One limitation is that the formula used to calculate the exchange rate is simplistic and not reflective of real-world exchange rates. Additionally, the simulation only runs for a short period, which limits its usefulness in making predictions about future exchange rate movements.

In terms of improvements, one approach could be to use more complex models to calculate exchange rates. For instance, models based on economic variables such as interest rates, inflation, and economic growth may provide more accurate predictions. Additionally, simulations that incorporate longer time horizons could be more useful for understanding exchange rate dynamics over time.

### CONCLUSION

In summary, while this simulation provides a basic visualization of exchange rates, it has some limitations. To improve the accuracy of the simulation, it may be necessary to use more sophisticated models and incorporate longer time horizons.

### Installation

#### 1. Clone and Install (if you have react-native)

```bash
  # Clone the repo
  git clone https://github.com/GeniusPRO271/live-chart

  # Navigate to clonned folder and Install dependencies
  npm install

  # Run it
  npm start

```

#### 2. Run it online without react-native

- [CodeSandbox](https://codesandbox.io/p/github/GeniusPRO271/live-chart/main?file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522cles8m3ei0000g0f1a2yn7ud3%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522cles8m4wv000x3b6kxoxzil9o%2522%253A%257B%2522key%2522%253A%2522cles8m4wv000x3b6kxoxzil9o%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522cles917mx00113b6i9t4jm73q%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522cles8m4wv000x3b6kxoxzil9o%2522%252C%2522spacesOrder%2522%253A%255B%2522cles8m4wv000x3b6kxoxzil9o%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D)

## Author

- [@GeniusPRO271](https://github.com/GeniusPRO271)
