# Frontend Documentation

This project is a full-stack application with a frontend built using React.js. The frontend is responsible for displaying data to the user and handling user interactions.

## Technologies Used

- [React.js:](https://react.dev/) A JavaScript library for building user interfaces.
- [Axios:](https://axios-http.com/) A promise-based HTTP client for the browser and Node.js.
- [React Router Dom:](https://github.com/remix-run/react-router#readme) A collection of navigational components that compose declaratively with your application.
- [React Datepicker:](https://github.com/Hacker0x01/react-datepicker) A simple and reusable datepicker component for React.
- [React Country Region Selector:](https://github.com/country-regions/react-country-region-selector#readme) Country / region react dropdown selector for forms.
- [JWT Decode:](https://github.com/auth0/jwt-decode#readme) Allows you to decode, verify and generate JWT.
- [JS Cookie:](https://github.com/auth0/jwt-decode#readme) A simple, lightweight JavaScript API for handling browser cookies.
- [Date-fns:](https://github.com/date-fns/date-fns#readme) Modern JavaScript date utility library.
- [@mui/material and @mui/icons-material:](https://mui.com/material-ui/material-icons/) React components for faster and easier web development, with Google's Material Design.

## Project Structure

The frontend is structured into components, pages, and API calls.

- Components: Reusable parts of the user interface.
- Pages: Different sections of the website, each corresponding to a route.
- API: Functions for making requests to the backend.

## Running the Frontend

To run the frontend, use the following command: `npm start`.

This will start the server at <http://localhost:3000>.

## Environment Variables

The frontend uses the following environment variables:

- baseURL: The URL of the backend API.

It is defined in the axios setting file inside `/src/api`.

## Conclusion

This frontend provides a user-friendly interface for interacting with the backend.
