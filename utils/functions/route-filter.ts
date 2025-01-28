export const parseFiltersFromPath = (
    path: string
  ): Record<string, string | string[]> => {
    const segments = path.split("/").filter(Boolean);
    const filters: Record<string, string | string[]> = {};
  
    for (let i = 0; i < segments.length; i += 2) {
      const key = segments[i];
      const value = segments[i + 1];
      if (key && value) {
        const processedValue = processFilterValue(value);
        filters[key] = processedValue;
      }
    }
  
    return filters;
  };
  const processFilterValue = (value: string): string | string[] => {
    // اگر value شامل علامت + باشد، به این معنی است که مقادیر مختلف در یک آرایه وجود دارد
    if (value.includes(",")) {
      return value.split(",").join("+");
    }
  
    // اگر value یک آبجکت باشد (مثلا در قالب JSON)
    try {
      const parsedValue = JSON.parse(value);
  
      if (Array.isArray(parsedValue)) {
        // اگر آرایه باشد، مقادیر داخل آرایه را با + جدا می‌کنیم
        return parsedValue.join("+");
      } else if (typeof parsedValue === "object") {
        // اگر آبجکت باشد، مقادیر آن را با / جدا می‌کنیم
        return Object.values(parsedValue).join("/");
      }
    } catch (e) {
      // اگر JSON نتوانست پارس شود، خود value را برمی‌گردانیم
      return value;
    }
  
    return value; // در صورتی که به هیچ کدوم از موارد نخورد
  };
  