export class CreateAuditDto {
  userId?: number | null;
  method: string;
  url: string;
  status: number;
  meta?: any;
}
