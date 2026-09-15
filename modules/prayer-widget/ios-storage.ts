/**
 * Everywhere but iPhone there is no app group to write to. The iPhone file,
 * `ios-storage.ios.ts`, is the only one that loads `@bacons/apple-targets`,
 * so the web export never touches it.
 */
export function writeIosSchedule(json: string | null): void {
  void json;
}
