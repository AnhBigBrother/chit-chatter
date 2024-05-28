class AppError extends Error {
  status: number;
  issues: object | null;
  constructor(status: number, message: string, issues?: object) {
    super(message);
    this.status = status;
    this.issues = issues ? issues : null;
  }
}

export { AppError };
