'use client';

import { useEffect, useRef } from 'react';

/**
 * A utility to manage timeouts and ensure proper cleanup
 */
export class TimeoutManager {
  private timeouts: Map<NodeJS.Timeout, boolean> = new Map();

  /**
   * Creates a timeout and tracks it for later cleanup
   */
  setTimeout(callback: ()=> void, delay: number): NodeJS.Timeout {
    const id = setTimeout(callback, delay);
    this.timeouts.set(id, true);
    return id;
  }

  /**
   * Clears a specific timeout and removes it from tracking
   */
  clearTimeout(id: NodeJS.Timeout): void {
    clearTimeout(id);
    this.timeouts.delete(id);
  }

  /**
   * Clears all tracked timeouts
   */
  clearAll(): void {
    this.timeouts.forEach((_, id) => {
      clearTimeout(id);
    });
    this.timeouts.clear();
  }
}

/**
 * Hook to create and manage a TimeoutManager
 */
export function useTimeoutManager(): TimeoutManager {
  const managerRef = useRef<TimeoutManager | null>(null);

  if (!managerRef.current) {
    managerRef.current = new TimeoutManager();
  }

  useEffect(() => {
    // Cleanup function that runs when component unmounts
    return () => {
      managerRef.current?.clearAll();
    };
  }, []);

  return managerRef.current;
}
