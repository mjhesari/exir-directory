// src/utils/errorHandler.ts
interface ErrorDetails {
    message: string;
    stack?: string;
    location?: string;
    backendResponse?: {
      status: number;
      statusText: string;
      url: string;
      responseBody?: any;
    };
  }
  
  export const errorHandler = (error: any, location?: string): ErrorDetails => {
    if (error.response) {
      return {
        message: error.message,
        location,
        backendResponse: {
          status: error.response.status,
          statusText: error.response.statusText,
          url: error.response.config?.url || "Unknown",
          responseBody: error.response.data || {},
        },
      };
    } else if (error.request) {
      return {
        message: "No response from backend",
        location,
        backendResponse: {
          status: 0,
          statusText: "No response",
          url: error.request?.url || "Unknown",
        },
      };
    } else {
      return {
        message: error.message || "Frontend Error",
        stack: error.stack,
        location,
      };
    }
  };
  