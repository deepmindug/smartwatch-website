<?php
/**
 * Plugin Name: Smartwatch Blog
 * Description: Blog presentation for Smartwatch Solutions: article header (eyebrow, lead, byline, reading time, featured image), end-of-article demo band and related articles, BlogPosting schema, and the "Latest articles" grid on /resources/blog/ (shown only once posts are published). Styles live in uploads/smartwatch/sw-blog.css.
 */
if (!defined('ABSPATH')) exit;

function sw_blog_minutes($post) {
    $w = str_word_count(wp_strip_all_tags($post->post_content));
    return max(1, (int) round($w / 200));
}

function sw_blog_cat($post) {
    $c = get_the_category($post->ID);
    return $c ? $c[0] : null;
}

function sw_blog_card($p) {
    $cat = sw_blog_cat($p);
    $img = get_the_post_thumbnail($p->ID, 'medium_large', ['class' => 'sw-bc-img', 'loading' => 'lazy', 'alt' => '']);
    return '<a class="sw-bc" href="' . esc_url(get_permalink($p)) . '">'
        . ($img ? '<span class="sw-bc-media">' . $img . '</span>' : '')
        . '<span class="sw-bc-body">'
        . ($cat ? '<span class="sw-bc-eyebrow">' . esc_html($cat->name) . '</span>' : '')
        . '<span class="sw-bc-title">' . esc_html(get_the_title($p)) . '</span>'
        . '<span class="sw-bc-excerpt">' . esc_html(wp_trim_words(get_the_excerpt($p), 22)) . '</span>'
        . '<span class="sw-bc-more">Read article <span aria-hidden="true">&rarr;</span></span>'
        . '</span></a>';
}

/* ---------- assets */
add_action('wp_enqueue_scripts', function () {
    $blog = get_page_by_path('resources/blog');
    $is_blog_page = $blog && is_page($blog->ID);
    if (!is_singular('post') && !$is_blog_page && !is_category() && !is_home()) return;
    $u = wp_upload_dir();
    $f = '/smartwatch/sw-blog.css';
    if (file_exists($u['basedir'] . $f)) wp_enqueue_style('sw-blog', $u['baseurl'] . $f, [], filemtime($u['basedir'] . $f));
    foreach (['questrial', 'opensans'] as $font) {
        $p = '/elementor/google-fonts/css/' . $font . '.css';
        if (file_exists($u['basedir'] . $p)) wp_enqueue_style('sw-font-' . $font, $u['baseurl'] . $p, [], filemtime($u['basedir'] . $p));
    }
}, 30);

add_filter('body_class', function ($c) { if (is_singular('post')) $c[] = 'sw-article'; return $c; });

/* ---------- article header */
add_action('astra_single_header_before', function () {
    if (!is_singular('post')) return;
    $cat = sw_blog_cat(get_post());
    echo '<div class="sw-art-eyebrow"><a href="' . esc_url(home_url('/resources/blog/')) . '">Blog</a>'
        . ($cat ? ' <span aria-hidden="true">&middot;</span> <span>' . esc_html($cat->name) . '</span>' : '') . '</div>';
});

add_action('astra_single_header_after', function () {
    if (!is_singular('post')) return;
    $p = get_post();
    if (has_excerpt($p)) echo '<p class="sw-art-lead">' . esc_html(get_the_excerpt($p)) . '</p>';
    $date = get_post_status($p) === 'publish' ? get_the_date('j F Y', $p) : 'Draft';
    echo '<div class="sw-art-meta"><span class="sw-art-by">Smartwatch Solutions</span><span aria-hidden="true">&middot;</span><span>' . esc_html($date)
        . '</span><span aria-hidden="true">&middot;</span><span>' . sw_blog_minutes($p) . ' min read</span></div>';
    if (has_post_thumbnail($p)) {
        echo '<figure class="sw-art-figure">' . get_the_post_thumbnail($p, 'large', ['fetchpriority' => 'high', 'loading' => 'eager', 'alt' => esc_attr(get_the_title($p))]) . '</figure>';
    }
});

/* ---------- end of article: demo band + related */
add_filter('the_content', function ($html) {
    if (!is_singular('post') || !in_the_loop() || !is_main_query()) return $html;
    $p = get_post();
    $band = '<aside class="sw-art-cta"><p class="sw-art-cta-eyebrow">See it in action</p>'
        . '<p class="sw-art-cta-title">A 30-minute walkthrough with our Kampala or Nairobi team, on your fleet and your routes.</p>'
        . '<p class="sw-art-cta-actions"><a class="sw-btn sw-btn-solid" href="' . esc_url(home_url('/contact/')) . '">Get a demo</a>'
        . '<a class="sw-btn sw-btn-line" href="' . esc_url(home_url('/products/')) . '">Explore products</a></p></aside>';
    $cat = sw_blog_cat($p);
    $args = ['post_type' => 'post', 'post_status' => 'publish', 'numberposts' => 3, 'post__not_in' => [$p->ID]];
    $rel = $cat ? get_posts($args + ['category' => $cat->term_id]) : [];
    if (count($rel) < 3) {
        $more = get_posts(['post__not_in' => array_merge([$p->ID], wp_list_pluck($rel, 'ID'))] + $args);
        $rel = array_slice(array_merge($rel, $more), 0, 3);
    }
    $related = $rel ? '<section class="sw-art-related"><h2>Keep reading</h2><div class="sw-bc-grid">' . implode('', array_map('sw_blog_card', $rel)) . '</div></section>' : '';
    return $html . $band . $related;
}, 20);

/* Hide Astra's own byline (it shows the WordPress username). */
add_filter('astra_single_post_meta', '__return_empty_string');

/* ---------- BlogPosting schema */
add_action('wp_head', function () {
    if (!is_singular('post')) return;
    $p = get_post();
    $url = get_permalink($p);
    $img = get_the_post_thumbnail_url($p, 'full');
    $d = [
        '@context' => 'https://schema.org', '@type' => 'BlogPosting', '@id' => $url . '#article',
        'mainEntityOfPage' => ['@id' => $url . '#webpage'],
        'headline' => wp_strip_all_tags(get_the_title($p)),
        'description' => get_post_meta($p->ID, '_sw_seo_desc', true) ?: get_the_excerpt($p),
        'datePublished' => get_post_time('c', true, $p), 'dateModified' => get_post_modified_time('c', true, $p),
        'author' => ['@id' => home_url('/') . '#organization'], 'publisher' => ['@id' => home_url('/') . '#organization'],
        'articleSection' => ($c = sw_blog_cat($p)) ? $c->name : null,
        'wordCount' => str_word_count(wp_strip_all_tags($p->post_content)), 'inLanguage' => 'en-US',
    ];
    if ($img) $d['image'] = $img;
    echo '<script type="application/ld+json">' . wp_json_encode(array_filter($d), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "</script>\n";
}, 40);

/* ---------- /resources/blog/: latest articles grid after the hero, only when posts are published */
add_filter('elementor/frontend/the_content', function ($html) {
    $blog = get_page_by_path('resources/blog');
    if (!$blog || !is_page($blog->ID) || strpos($html, 'sw-latest-articles') !== false) return $html;
    $posts = get_posts(['post_type' => 'post', 'post_status' => 'publish', 'numberposts' => 9]);
    if (!$posts) return $html;
    $grid = '<section class="sw-latest-articles" aria-labelledby="sw-latest-h"><div class="sw-la-inner">'
        . '<p class="sw-la-eyebrow">From the blog</p><h2 id="sw-latest-h" class="sw-la-title">Latest articles.</h2>'
        . '<div class="sw-bc-grid">' . implode('', array_map('sw_blog_card', $posts)) . '</div></div></section>';
    if (preg_match('/<div[^>]*class="[^"]*\bsw-cards-section\b/', $html, $m, PREG_OFFSET_CAPTURE)) {
        return substr($html, 0, $m[0][1]) . $grid . substr($html, $m[0][1]);
    }
    return $html . $grid;
});
