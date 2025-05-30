
export interface TestResult {
  test: string;
  status: "pass" | "fail" | "pending";
  details: string;
  data?: any;
}
