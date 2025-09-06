const feedbackForm = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write(`
        <body
    style="
      background-color: #343434;
      color: #f1f1f1;
      text-align: center;
      margin-top: 60px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    "
  >
    <h1>Submit your Feedback</h1>
    <form
      action="/feedback"
      method="POST"
      style="
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 400px;
        margin-inline: auto;
        border: 1px solid #f1f1f1;
        padding: 20px;
      "
    >
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        required
        style="
          padding: 10px 4px;
          background: transparent;
          outline: none;
          border: 1px solid #f1f1f1;
          color: white;
        "
      />
      <input
        type="text"
        name="feedback"
        placeholder="Enter your feedback"
        required
        style="
          padding: 10px 4px;
          background: transparent;
          outline: none;
          border: 1px solid #f1f1f1;
          color: white;
        "
      />
      <button
        type="submit"
        style="
          padding: 10px 4px;
          background: #f1f1f1;
          outline: none;
          border: 1px solid #f1f1f1;
          cursor: pointer;
        "
      >
        Submit Feedback
      </button>
    </form>
  </body>
    `);
  return res.end();
};

exports.feedbackForm = feedbackForm;
