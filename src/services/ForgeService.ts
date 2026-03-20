import {makeAutoObservable} from 'mobx';
import {revenueService} from './RevenueService';

class ForgeService {
  public activeJobs: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Starts a Cloud-LoRA training run ("The Forge").
   * Requires 1 Cloud Credit.
   */
  public async igniteForge(datasetUri: string) {
    if (!revenueService.useCredit()) {
      throw new Error('Insufficient Cloud Credits. Please visit the Treasury.');
    }

    console.log(`[Forge] Igniting training run for dataset: ${datasetUri}`);
    const jobId = Math.random().toString(36).substring(7);
    
    this.activeJobs.push({
      id: jobId,
      status: 'HEATING',
      progress: 0,
      startedAt: Date.now()
    });

    return jobId;
  }

  public getJobStatus(jobId: string) {
    return this.activeJobs.find(j => j.id === jobId);
  }
}

export const forgeService = new ForgeService();
