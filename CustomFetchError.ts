export default class CustomFetchError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
