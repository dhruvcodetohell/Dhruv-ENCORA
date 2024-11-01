export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest" 
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        
        "\\.(css|scss)$": "<rootDir>/jest-mocks/styleMock.ts",
      },
  };
  