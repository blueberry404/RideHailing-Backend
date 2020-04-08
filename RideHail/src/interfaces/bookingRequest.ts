export interface IBookingRequest {
    userId: number,
    sourceLat: number,
    sourceLong: number,
    destLat: number,
    destLong: number
}

export interface IRideAcceptRequest {
    rideId: number,
    consumerId: number,
    driverId: number
}
