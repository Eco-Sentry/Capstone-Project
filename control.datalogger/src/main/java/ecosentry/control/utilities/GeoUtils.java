package ecosentry.control.utilities;

public class GeoUtils {
    // Earth's radius in kilometers
    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Calculates the distance between two points in latitude and longitude.
     * Returns the distance in kilometers.
     */
    public static double haversine(double lat1, double lon1, double lat2, double lon2) {
        // Convert the latitudes and longitudes from degrees to radians.
        double lat1Rad = Math.toRadians(lat1);
        double lon1Rad = Math.toRadians(lon1);
        double lat2Rad = Math.toRadians(lat2);
        double lon2Rad = Math.toRadians(lon2);

        // Haversine formula
        double deltaLat = lat2Rad - lat1Rad;
        double deltaLon = lon2Rad - lon1Rad;
        double a = Math.pow(Math.sin(deltaLat / 2), 2)
                 + Math.cos(lat1Rad) * Math.cos(lat2Rad)
                 * Math.pow(Math.sin(deltaLon / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_KM * c;
    }

    /**
     * Checks if the distance between two points is less than or equal to the specified range.
     */
    public static boolean isWithinRange(double lat1, double lon1, double lat2, double lon2, double rangeKm) {
        return haversine(lat1, lon1, lat2, lon2) <= rangeKm;
    }
}