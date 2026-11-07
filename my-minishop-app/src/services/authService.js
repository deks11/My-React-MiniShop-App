// =================================
// MOCKAPI USERS ENDPOINT
// =================================

const USERS_API = "https://6a5e0aa298d9f02aed78f307.mockapi.io/users";


// =================================
// REGISTER USER
// =================================

export async function registerUser(userData) {

  const checkResponse = await fetch(
    `${USERS_API}?email=${encodeURIComponent(userData.email)}`
  );

  if (!checkResponse.ok) {
    throw new Error("Could not check user.");
  }

  const existingUsers = await checkResponse.json();

  if (existingUsers.length > 0) {
    throw new Error("Email already exists!");
  }

  const response = await fetch(USERS_API, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed!");
  }

  return await response.json();
}


// =================================
// LOGIN USER
// =================================

export async function loginUser(email, password) {

  const response = await fetch(
    `${USERS_API}?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Login request failed.");
  }

  const users = await response.json();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    throw new Error("Incorrect email or password!");
  }

  return user;
}