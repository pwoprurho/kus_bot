import {palStore} from '../store';
import {palsHubService} from './palsHubService';
import {hrManager} from './native/HRManager';

const REFRESH_INTERVAL_MS = 2 * 60 * 60 * 1000; // 2 Hours

class NewsScoutService {
  private lastSync: number = 0;
  private intervalId: NodeJS.Timeout | null = null;

  /**
   * Initializes the News Scout. 
   * Checks for freshness immediately and then every 10 minutes.
   */
  public start() {
    if (this.intervalId) return;

    this.checkAndSync();
    this.intervalId = setInterval(() => {
      this.checkAndSync();
    }, 10 * 60 * 1000); // Check every 10 mins
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Core logic to determine if a News Sync is required.
   */
  private async checkAndSync() {
    const now = Date.now();
    const timeSinceLastSync = now - this.lastSync;

    if (timeSinceLastSync >= REFRESH_INTERVAL_MS) {
      console.log('[NewsScout] 2-hour window reached. Triggering sync...');
      await this.performSync();
    }
  }

  private async performSync() {
    try {
      console.log('[NewsScout] Checking for fresh signals...');
      
      // 1. Secure Fetch from Kus Knowledge Hub
      // We use the hrManager.secureFetch to ensure API keys never touch JS memory
      const syncParams = {
        since_timestamp: Math.floor(this.lastSync / 1000),
      };
      
      const payload = await hrManager.secureFetch('https://kus-api.sovereign.os/knowledge/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syncParams)
      });
      
      if (payload && payload.length > 0) {
        // 2. Inject into Knowledge Vault / WatermelonDB
        // For the prototype, we simulate the vector database insertion
        await this.injectIntoVectorDB(payload);
        
        console.log(`[NewsScout] Sync Successful: ${payload.length} signals vectorized.`);
        this.lastSync = Date.now();
      } else {
        console.log('[NewsScout] Already up to date.');
      }
    } catch (error) {
      console.error('[NewsScout] Sync failed:', error);
    }
  }

  private async injectIntoVectorDB(data: any[]) {
    // This is where we would call op-sqlite or sqlite-vec 
    // to store the embeddings for local RAG.
    // data.forEach(signal => { ... insert ... });
    return Promise.resolve();
  }

  public getFreshnessRemaining(): string {
    const now = Date.now();
    const remaining = REFRESH_INTERVAL_MS - (now - this.lastSync);
    if (remaining <= 0) return 'Stale';
    const mins = Math.floor(remaining / 60000);
    return `${mins}m until refresh`;
  }
}

export const newsScoutService = new NewsScoutService();
