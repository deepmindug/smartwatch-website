<?php
/**
 * Plugin Name: Smartwatch Media
 * Description: Serves replacement videos in two sizes (desktop and phone, picked by the browser through <source media>), each encoded with the index at the front so playback starts before the download finishes. Files live in uploads/smartwatch/media. Covers the homepage hero video and the Tracking & Telematics live map.
 */
if (!defined('ABSPATH')) exit;

function sw_media_videos() {
    return [
        '/hero.mp4'              => ['desktop' => 'hero-v2-1080.mp4', 'mobile' => 'hero-v2-720.mp4', 'poster' => 'hero-v2-poster.webp'],
        '/live-map-tracking.mp4' => ['desktop' => 'live-map-v2-1440.mp4', 'mobile' => 'live-map-v2-960.mp4', 'poster' => 'live-map-v2-poster.webp'],
    ];
}

add_filter('elementor/widget/render_content', function ($html, $widget) {
    if ($widget->get_name() !== 'video') return $html;
    $u = wp_upload_dir();
    $dir = $u['basedir'] . '/smartwatch/media/';
    $url = $u['baseurl'] . '/smartwatch/media/';
    foreach (sw_media_videos() as $needle => $f) {
        if (strpos($html, $needle) === false) continue;
        if (!file_exists($dir . $f['desktop']) || !file_exists($dir . $f['mobile'])) return $html;
        $v = function ($n) use ($dir, $url) { return esc_url($url . $n . '?v=' . filemtime($dir . $n)); };
        $sources = '<source src="' . $v($f['mobile']) . '" type="video/mp4" media="(max-width: 767px)">'
            . '<source src="' . $v($f['desktop']) . '" type="video/mp4">';
        $poster = file_exists($dir . $f['poster']) ? ' poster="' . $v($f['poster']) . '"' : '';
        return preg_replace_callback('#<video\b([^>]*)>\s*</video>#', function ($m) use ($sources, $poster) {
            $attrs = preg_replace(['#\ssrc="[^"]*"#', '#\sposter="[^"]*"#', '#\spreload="[^"]*"#'], '', $m[1]);
            return '<video' . $attrs . $poster . ' preload="auto">' . $sources . '</video>';
        }, $html, 1);
    }
    return $html;
}, 10, 2);
