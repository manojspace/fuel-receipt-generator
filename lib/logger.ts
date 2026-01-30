/**
 * Datadog Browser Logging Module
 *
 * Provides centralized logging for usage tracking and error monitoring.
 * Initializes Datadog browser logs SDK for client-side telemetry.
 */

import { datadogLogs } from '@datadog/browser-logs';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogContext = {
  [key: string]: unknown;
};

const isInitialized = { current: false };

/**
 * Initialize Datadog logging
 * Should be called once at app startup
 */
export function initDatadog(): void {
  if (isInitialized.current || typeof window === 'undefined') {
    return;
  }

  const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
  const site = process.env.NEXT_PUBLIC_DATADOG_SITE || 'datadoghq.com';
  const service = process.env.NEXT_PUBLIC_DATADOG_SERVICE || 'fuel-receipt-generator';
  const env = process.env.NEXT_PUBLIC_DATADOG_ENV || process.env.NODE_ENV || 'development';

  if (!clientToken) {
    console.warn('[Datadog] Client token not configured. Logging disabled.');
    return;
  }

  datadogLogs.init({
    clientToken,
    site,
    service,
    env,
    forwardErrorsToLogs: true,
    forwardConsoleLogs: ['error', 'warn'],
    sessionSampleRate: 100,
  });

  isInitialized.current = true;
  console.info('[Datadog] Logging initialized');
}

/**
 * Log a message with context
 */
function log(level: LogLevel, message: string, context?: LogContext): void {
  const logData = {
    message,
    timestamp: new Date().toISOString(),
    url: typeof window === 'undefined' ? '' : window.location.href,
    userAgent: typeof navigator === 'undefined' ? '' : navigator.userAgent,
    ...context,
  };

  if (isInitialized.current) {
    switch (level) {
      case 'debug': {
        datadogLogs.logger.debug(message, logData);
        break;
      }
      case 'info': {
        datadogLogs.logger.info(message, logData);
        break;
      }
      case 'warn': {
        datadogLogs.logger.warn(message, logData);
        break;
      }
      case 'error': {
        datadogLogs.logger.error(message, logData);
        break;
      }
    }
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    const consoleMethod = level === 'debug' ? 'log' : level;
    console[consoleMethod](`[${level.toUpperCase()}]`, message, context || '');
  }
}

/**
 * Track user actions for analytics
 */
export function trackAction(action: string, context?: LogContext): void {
  log('info', `User Action: ${action}`, { action, ...context });
}

/**
 * Track errors with full context
 */
export function trackError(error: Error | string, context?: LogContext): void {
  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;

  log('error', errorMessage, {
    errorStack,
    errorName: error instanceof Error ? error.name : 'UnknownError',
    ...context,
  });
}

/**
 * Track PDF generation events
 */
export function trackPDFGeneration(success: boolean, context?: LogContext): void {
  log('info', success ? 'PDF Generated Successfully' : 'PDF Generation Failed', {
    event: 'pdf_generation',
    success,
    ...context,
  });
}

/**
 * Track print events
 */
export function trackPrint(context?: LogContext): void {
  log('info', 'Print Triggered', {
    event: 'print',
    ...context,
  });
}

/**
 * Track image download events
 */
export function trackImageDownload(success: boolean, context?: LogContext): void {
  log('info', success ? 'Image Downloaded Successfully' : 'Image Download Failed', {
    event: 'image_download',
    success,
    ...context,
  });
}

/**
 * Track design selection changes
 */
export function trackDesignChange(designName: string, context?: LogContext): void {
  log('info', `Design Changed: ${designName}`, {
    event: 'design_change',
    designName,
    ...context,
  });
}

/**
 * Track page views
 */
export function trackPageView(context?: LogContext): void {
  log('info', 'Page View', {
    event: 'page_view',
    ...context,
  });
}

export const logger = {
  debug: (message: string, context?: LogContext) => log('debug', message, context),
  info: (message: string, context?: LogContext) => log('info', message, context),
  warn: (message: string, context?: LogContext) => log('warn', message, context),
  error: (message: string, context?: LogContext) => log('error', message, context),
};
