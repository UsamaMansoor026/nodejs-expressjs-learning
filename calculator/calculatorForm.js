const calculatorForm = () => {
  return `
    <form action="/calculate-result" method="post">
        <input type="number" name="num1" placeholder="First Number" required />
        <input type="number" name="num2" placeholder="Second Number" required />
        <button type="submit">Sum</button>
    </form>
    `;
};

module.exports = calculatorForm;
