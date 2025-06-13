import { z } from 'zod';

export const CertificateSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'), 
  certId: z.string().min(1, 'Certificate ID is required'),
  ipfsHash: z.string().min(1, 'IPFS hash is required'),
  blockchainTx: z.string().optional(), 
  title: z.string().min(1, 'Title is required'),
  issuedAt: z.union([z.date(), z.string()]),
  revoked: z.boolean().optional()
});