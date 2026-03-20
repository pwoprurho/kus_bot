import {makeAutoObservable} from 'mobx';

export type UserTier = 'SOVEREIGN' | 'AGENTIC';

class RevenueService {
  public currentTier: UserTier = 'SOVEREIGN';
  public cloudCredits: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Upgrades the user to the Agentic tier.
   * In production, this would be called after a successful Stripe/IAP transaction.
   */
  public async upgradeToAgentic() {
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.currentTier = 'AGENTIC';
    console.log('[RevenueService] Tier upgraded to AGENTIC.');
  }

  /**
   * Checks if a feature is accessible to the user.
   */
  public isFeatureEnabled(featureId: string): boolean {
    if (this.currentTier === 'AGENTIC') return true;

    const premiumFeatures = ['DAG_WORKFLOWS', 'SECURITY_ENCLAVE', 'CLOUD_LORA', 'NEWS_SCOUT_2H'];
    return !premiumFeatures.includes(featureId);
  }

  /**
   * Adds credits for Cloud-LoRA "Forge" runs.
   */
  public addCredits(amount: number) {
    this.cloudCredits += amount;
  }

  public useCredit(): boolean {
    if (this.cloudCredits > 0) {
      this.cloudCredits--;
      return true;
    }
    return false;
  }
}

export const revenueService = new RevenueService();
