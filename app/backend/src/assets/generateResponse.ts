const generateResponse = (status: number, message: unknown) =>
  ({ status, message });
const generateError = (status: number, message: unknown) =>
  generateResponse(status, { message });

export { generateResponse, generateError };
