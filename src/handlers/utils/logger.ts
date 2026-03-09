enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const currentLevel = (process.env.LOG_LEVEL || 'INFO') as keyof typeof LogLevel;

export const logger = {
  debug: (message: string, data?: any) => {
    if (LogLevel[currentLevel] <= LogLevel.DEBUG) {
      console.log(JSON.stringify({ level: 'DEBUG', message, data }));
    }
  },
  info: (message: string, data?: any) => {
    if (LogLevel[currentLevel] <= LogLevel.INFO) {
      console.log(JSON.stringify({ level: 'INFO', message, data }));
    }
  },
  warn: (message: string, data?: any) => {
    if (LogLevel[currentLevel] <= LogLevel.WARN) {
      console.warn(JSON.stringify({ level: 'WARN', message, data }));
    }
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({ 
      level: 'ERROR', 
      message, 
      error: error instanceof Error ? error.message : error 
    }));
  },
};
