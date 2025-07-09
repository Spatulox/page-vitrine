export type Room = {
    _id: string,
    name: string,
    description: string,
    long_description: string,
    price: number,
    estimated_duration: number,
    duration: number, /* In Minutes */
    participants: number,
    max_participants: number,
}