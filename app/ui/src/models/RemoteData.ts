export enum RemoteDataStatus {
  NotAsked = "not_asked",
  Loading = "loading",
  Failure = "failure",
  Success = "success",
}

export type RemoteData<T> = T & { status: RemoteDataStatus };
