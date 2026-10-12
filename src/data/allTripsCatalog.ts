import { Trip } from '@/types/rove';
import {
  initialGoaTrip,
  initialLadakhTrip,
  initialBaliTrip,
  destinationBookingCatalog,
  DestinationCatalog,
} from '@/data/mockData';
import {
  initialJaipurTrip,
  initialManaliTrip,
  initialKeralaTrip,
  initialUdaipurTrip,
  initialKashmirTrip,
  slideshowBookingCatalog,
} from '@/data/slideshowTrips';

export const allTripsMap: Record<string, Trip> = {
  goa: initialGoaTrip,
  jaipur: initialJaipurTrip,
  manali: initialManaliTrip,
  kerala: initialKeralaTrip,
  udaipur: initialUdaipurTrip,
  kashmir: initialKashmirTrip,
  ladakh: initialLadakhTrip,
  bali: initialBaliTrip,
};

export const allBookingCatalog: Record<string, DestinationCatalog> = {
  ...destinationBookingCatalog,
  ...slideshowBookingCatalog,
};
