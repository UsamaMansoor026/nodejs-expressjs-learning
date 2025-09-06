const userForm = () => {
  return `
        <html>
        <head><title>User Page</title></head>
        <body>
          <h1>Enter Your Details</h1>
          <form action="user-detail" method="POST">
            <input type="text" name="username" placeholder="Username" required /><br><br>
            <input type="number" name="age" placeholder="Age" required /><br><br>
            <label>Select your gender:</label><br>
            <label for="male">Male</label>
            <input type="radio" name="gender" id="male" value="male" required /> <br>
            <label for="female">Female</label>
            <input type="radio" name="gender" for="female" value="female" required /> <br>
            <button type="submit">Submit</button>
          </form>
      </html>
    `;
};

module.exports = userForm;
