// src/api/userApi.js
export const fetchUserData = async () => {
  // Simulated API call
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: "John Doe", loggedIn: true }), 1000)
  );
};
