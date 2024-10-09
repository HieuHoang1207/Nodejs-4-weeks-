// Hàm tạo template email
const generateEmailTemplate = (name, content) => {
  return `
      <h1>Hello, ${name}!</h1>
      <p>${content}</p>
      <footer>Chào mừng bạn đến với Gooup1</footer>
    `;
};

module.exports = { generateEmailTemplate };
