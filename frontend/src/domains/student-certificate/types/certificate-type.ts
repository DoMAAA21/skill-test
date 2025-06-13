import { z } from 'zod';
import { CertificateSchema } from './certificate-schema'; // Assuming you already created this

export type Certificate = z.infer<typeof CertificateSchema>;

export type CertificateWithId = Certificate & {
  id: number;
};

export type CertificateFormState = Certificate;

export type CertificateState = {
  isLoading: boolean;
  isError: boolean;
  error?: string;
  certificates: CertificateWithId[];
};

export type CertificateDetail = {
  certificate: CertificateWithId;
};

export type CertificateFilter = {
  studentId?: string;
  title?: string;
  issuedAt?: Date;
};

export type CertificateFormAction =
  | {
      type: 'SET_FIELD';
      payload: {
        name: keyof CertificateFormState;
        value: string | Date | boolean;
      };
    }
  | {
      type: 'SET_STATE';
      payload: CertificateFormState;
    }
  | {
      type: 'RESET_FORM';
      payload: CertificateFormState;
    };

export type AddCertificateResponse = {
  message: string;
  id: number;
};

export type GetCertificatesResponse = {
  certificates: CertificateWithId[];
};
