import { api, Tag } from '@/api';
import {
  Certificate,
  CertificateWithId,
  AddCertificateResponse,
  CertificateFilter,
  CertificateDetail
} from '../types';
import { getQueryString } from '@/utils/helpers/get-query-string';

export const certificateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query<{ certificates: CertificateWithId[] }, CertificateFilter>({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/certificates${queryString}`;
      },
      providesTags: (result) =>
        result?.certificates?.map(({ id }) => ({ type: Tag.CERTIFICATES, id })) || [{ type: Tag.CERTIFICATES }]
    }),

    getCertificateDetail: builder.query<CertificateDetail, number>({
      query: (id) => `/certificates/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.CERTIFICATES, id: result.certificate.id }] : [])
    }),

    addCertificate: builder.mutation<AddCertificateResponse, Certificate>({
      query: (payload) => ({
        url: '/certificates',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.CERTIFICATES]
    }),

    updateCertificate: builder.mutation<{ message: string }, CertificateWithId>({
      query: ({ id, ...payload }) => ({
        url: `/certificates/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.CERTIFICATES, id }]
    }),

    deleteCertificate: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [{ type: Tag.CERTIFICATES, id }]
    })
  })
});

export const {
  useGetCertificatesQuery,
  useLazyGetCertificateDetailQuery,
  useAddCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation
} = certificateApi;
