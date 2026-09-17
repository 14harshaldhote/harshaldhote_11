import ApprovalFlow from './ApprovalFlow';
import RuleEngine from './RuleEngine';
import TenantIsolation from './TenantIsolation';
import ImportPipeline from './ImportPipeline';

// Keys match the `diagram` field in src/data/profile.js.
export const diagrams = {
  approval: ApprovalFlow,
  rules: RuleEngine,
  tenants: TenantIsolation,
  import: ImportPipeline,
};
