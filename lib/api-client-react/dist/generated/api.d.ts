import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AppointmentInput, HealthStatus, Receipt, Service } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getListServicesUrl: () => string;
export declare const listServices: (options?: Parameters<typeof customFetch>[1]) => Promise<Service[]>;
export declare const getListServicesQueryKey: () => readonly ["/api/services"];
export declare const getListServicesQueryOptions: <TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListServicesQueryResult = NonNullable<Awaited<ReturnType<typeof listServices>>>;
export type ListServicesQueryError = ErrorType<unknown>;
export declare function useListServices<TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateAppointmentRequestUrl: () => string;
export declare const createAppointmentRequest: (appointmentInput: AppointmentInput, options?: Parameters<typeof customFetch>[1]) => Promise<Receipt>;
export declare const getCreateAppointmentRequestMutationKey: () => readonly ["createAppointmentRequest"];
export declare const getCreateAppointmentRequestMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAppointmentRequest>>, TError, CreateAppointmentRequestMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAppointmentRequest>>, TError, CreateAppointmentRequestMutationVariables, TContext>;
export type CreateAppointmentRequestMutationResult = NonNullable<Awaited<ReturnType<typeof createAppointmentRequest>>>;
export type CreateAppointmentRequestMutationBody = BodyType<AppointmentInput>;
export type CreateAppointmentRequestMutationError = ErrorType<unknown>;
export type CreateAppointmentRequestMutationVariables = {
    data: BodyType<AppointmentInput>;
};
export declare const useCreateAppointmentRequest: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAppointmentRequest>>, TError, CreateAppointmentRequestMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAppointmentRequest>>, TError, CreateAppointmentRequestMutationVariables, TContext>;
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map