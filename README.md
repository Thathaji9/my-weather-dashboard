# Weather Dashboard App

A clean and responsive weather app built with React that shows you the current weather and a 5-day forecast in real time. It features a modern, glass-like design that feels smooth and easy to use, giving you all the weather info you need in a simple, beautiful interface.

<img width="1468" alt="Screenshot 2025-05-27 at 17 00 08" src="https://github.com/user-attachments/assets/a8017693-a574-413c-96b8-b43e19047598" />


---

## Technologies Used

* **React.js** - A declarative, component-based JavaScript library for building user interfaces.
* **Material-UI (MUI)** - A comprehensive suite of UI tools for building fast and beautiful React components.
* **Styled Components** - Visual primitives for the component age, allowing for scoped CSS-in-JS.
* **OpenWeatherMap API** - Provides real-time and forecast weather data.
* **JavaScript (ES6+)** - The core programming language.
* **CSS** - For custom styling and layout.

---

## Project Setup and Installation

Follow these steps to get a local copy of the project up and running on your development machine.

### Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your system. Alternatively, you can use [Yarn](https://yarnpkg.com/).

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL_HERE
cd weather-dashboard-app
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```
Or using yarn:

```bash
yarn install
```
### 3. Obtain Your OpenWeatherMap API Key
This application relies on the OpenWeatherMap API to fetch weather data.

Visit the [OpenWeatherMap website](https://openweathermap.org/api).

Sign up for a free account if you don't already have one.

Once logged in, navigate to the "API keys" tab in your profile. You will find your unique API key there.

### 4. Configure Environment Variables

Add your OpenWeatherMap API key to .env file as follows:

```bash
REACT_APP_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```
Important:

Replace YOUR_API_KEY_HERE with the actual API key you obtained.

5. Run the Application
Once dependencies are installed and your API key is configured, you can start the development server:

Using npm:
```bash
npm start
```

Or using Yarn:

```bash
yarn start
```
