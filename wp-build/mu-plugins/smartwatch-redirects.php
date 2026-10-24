<?php
/**
 * Plugin Name: Smartwatch Redirects
 * Description: Permanent (301) redirects from the old smartwatchsolutions.com URLs to their pages on the rebuilt site, so links and rankings the old pages earned carry over. Runs only when a request would otherwise be a 404.
 */
if (!defined('ABSPATH')) exit;

function sw_redirect_map() {
    return [
        'services'                               => '/products/',
        'tracking-telematics'                    => '/products/tracking-and-telematics/',
        'features'                               => '/products/driver-safety-dash-cameras/',
        'hardware-and-accessories'               => '/hardware/',
        'electronic-cargo-tracking-system'       => '/solutions/electronic-cargo-tracking/',
        'fleet-management-for-governments'       => '/solutions/government/',
        'food-manufacturing-and-processing'      => '/solutions/food-manufacturing/',
        'field-service-and-marketplace'          => '/solutions/field-service/',
        'satellite-tracking-solutions-for-ngos'  => '/solutions/ngo-satellite-tracking/',
        'trucking-logistics'                     => '/solutions/trucking-and-logistics/',
        'eco-drive-solution'                     => '/solutions/eco-drive/',
        'light-commercial-vehicle-tracking'      => '/solutions/commercial-vehicle-tracking/',
        'electrical-vehicle-ev-fleet-management' => '/solutions/ev-fleet-management/',
        'terms-and-conditions'                   => '/terms/',
        'blog'                                   => '/resources/blog/',
        'team'                                   => '/company/leadership/',
    ];
}

add_action('template_redirect', function () {
    if (!is_404()) return;
    $path = trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $map = sw_redirect_map();
    if (isset($map[$path])) {
        wp_redirect(home_url($map[$path]), 301, 'Smartwatch');
        exit;
    }
}, 1);
