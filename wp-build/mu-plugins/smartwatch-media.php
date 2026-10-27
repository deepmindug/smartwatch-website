<?php
/**
 * Plugin Name: Smartwatch Media
 * Description: Serves the homepage hero video in two sizes: 1080p for laptops and desktops, 720p for phones (picked by the browser through <source media>), both encoded with the index at the front so playback starts before the file finishes downloading. Files live in uploads/smartwatch/media.
 */
if (!defined('ABSPATH')) exit;

add_filter('elementor/widget/render_content', function ($html, $widget) {
    if ($widget->get_name() !== 'video' || strpos($html, '/hero.mp4') === false) return $html;
    $u = wp_upload_dir();
    $dir = $u['basedir'] . '/smartwatch/media/';
    $url = $u['baseurl'] . '/smartwatch/media/';
    if (!file_exists($dir . 'hero-v2-1080.mp4') || !file_exists($dir . 'hero-v2-720.mp4')) return $html;
    $v = function ($f) use ($dir) { return filemtime($dir . $f); };
    $sources = '<source src="' . esc_url($url . 'hero-v2-720.mp4?v=' . $v('hero-v2-720.mp4')) . '" type="video/mp4" media="(max-width: 767px)">'
        . '<source src="' . esc_url($url . 'hero-v2-1080.mp4?v=' . $v('hero-v2-1080.mp4')) . '" type="video/mp4">';
    return preg_replace_callback('#<video\b([^>]*)>\s*</video>#', function ($m) use ($sources, $url, $dir) {
        $attrs = preg_replace('#\ssrc="[^"]*"#', '', $m[1]);
        $attrs = preg_replace('#\sposter="[^"]*"#', '', $attrs);
        $attrs = preg_replace('#\spreload="[^"]*"#', '', $attrs);
        $poster = file_exists($dir . 'hero-v2-poster.webp') ? ' poster="' . esc_url($url . 'hero-v2-poster.webp?v=' . filemtime($dir . 'hero-v2-poster.webp')) . '"' : '';
        return '<video' . $attrs . $poster . ' preload="auto">' . $sources . '</video>';
    }, $html, 1);
}, 10, 2);
