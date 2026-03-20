import {NativeModules} from 'react-native';

const {HRManagerModule} = NativeModules;

export interface DeviceCapabilities {
  total_memory_mb: number;
  available_memory_mb: number;
  cpu_cores: number;
  cpu_brand: string;
  has_npu: boolean;
}

export interface SecureAction {
  action_type: string;
  payload: string;
  sensitivity_level: 'LOW' | 'MEDIUM' | 'HIGH';
}

/**
 * The HR Manager is the high-stakes Security Enclave for the Sovereign Workforce.
 * It interfaces with Rust via JSI for hardware-level security and performance.
 */
class HRManager {
  /**
   * Probes the hardware for capabilities. 
   * Used to filter GGUF models (e.g., only show 8B+ models if RAM > 12GB).
   */
  async getCapabilities(): Promise<DeviceCapabilities> {
    if (!HRManagerModule) {
      console.warn('HRManagerModule not found, returning mock capabilities.');
      return {
        total_memory_mb: 8192,
        available_memory_mb: 4096,
        cpu_cores: 8,
        cpu_brand: 'Mock Silicon',
        has_npu: false,
      };
    }
    const json = await HRManagerModule.getDeviceInfoJson();
    return JSON.parse(json);
  }

  /**
   * Signs a sensitive action (e.g., Trade Execution or SSH connection).
   * For HIGH sensitivity, this triggers a biometric challenge.
   */
  async signAction(action: SecureAction): Promise<string> {
    if (!HRManagerModule) {
      return `mock_signed_${action.action_type}`;
    }
    return HRManagerModule.signAction(JSON.stringify(action));
  }

  /**
   * Executes a fetch with credentials injected in Rust memory.
   * credentials (API keys) never touch the JavaScript thread.
   */
  async secureFetch(url: string, options: any): Promise<any> {
    if (!HRManagerModule) {
      return fetch(url, options).then(r => r.json());
    }
    return HRManagerModule.secureFetch(url, JSON.stringify(options));
  }
}

export const hrManager = new HRManager();
