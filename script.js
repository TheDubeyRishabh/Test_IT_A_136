const validCredentials = {
  username: "Rishabh",
  password: "12345678"
};

 
document.getElementById("login-btn").addEventListener("click", authenticateUser);

 
function authenticateUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === validCredentials.username && password === validCredentials.password) {
     
    document.getElementById("login-panel").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("user-name").textContent = username;  
    fetchGitHubUsers();  
  } else {
    alert("Invalid login details.");
  }
}
document.getElementById("logout-btn").addEventListener("click", logout);

 
function logout() {
  document.getElementById("login-panel").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

 
async function fetchGitHubUsers() {
  try {
    const response = await fetch("https://api.github.com/users");
    const users = await response.json();
    const topUsers = users.slice(0, 10);  
    displayUsers(topUsers);  
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
  }
}

 
function displayUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = '';  

  users.forEach(user => {
    const listItem = document.createElement("li");
    const userLink = document.createElement("a");
    userLink.href = user.html_url;
    userLink.target = "_blank";
    userLink.textContent = user.login; 
    listItem.appendChild(userLink);
    userList.appendChild(listItem);
  });
}

 
document.getElementById("sort-users").addEventListener("change", function() {
  const sortValue = this.value;
  if (sortValue === "alphabetical") {
    const userList = Array.from(document.getElementById("user-list").children);
    const sortedUsers = userList.sort((a, b) => {
      return a.textContent.localeCompare(b.textContent);
    });
    const sortedList = document.getElementById("user-list");
    sortedList.innerHTML = "";
    sortedUsers.forEach(item => sortedList.appendChild(item));
  }
});
