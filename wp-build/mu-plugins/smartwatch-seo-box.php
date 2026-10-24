<?php
/**
 * Plugin Name: Smartwatch SEO Box
 * Description: Adds an "SEO title & description" box to the post and page editors, writing the _sw_seo_title / _sw_seo_desc fields that the Smartwatch SEO layer prints in the page head.
 */
if (!defined('ABSPATH')) exit;

add_action('add_meta_boxes', function () {
    foreach (['post', 'page'] as $type) {
        add_meta_box('sw-seo-box', 'SEO title & description', 'sw_seo_box_render', $type, 'normal', 'high');
    }
});

function sw_seo_box_render($post) {
    wp_nonce_field('sw_seo_box', 'sw_seo_box_nonce');
    $t = get_post_meta($post->ID, '_sw_seo_title', true);
    $d = get_post_meta($post->ID, '_sw_seo_desc', true);
    $k = get_post_meta($post->ID, '_sw_focus_keyword', true);
    ?>
    <p style="margin-top:0;color:#50575e">What Google shows in search results. Leave the title empty to use the post title.</p>
    <p><label for="sw_seo_title"><strong>SEO title</strong> <span class="sw-count" data-for="sw_seo_title" data-max="60"></span></label><br>
      <input type="text" id="sw_seo_title" name="sw_seo_title" value="<?php echo esc_attr($t); ?>" style="width:100%" maxlength="90"></p>
    <p><label for="sw_seo_desc"><strong>Meta description</strong> <span class="sw-count" data-for="sw_seo_desc" data-max="155"></span></label><br>
      <textarea id="sw_seo_desc" name="sw_seo_desc" rows="3" style="width:100%" maxlength="200"><?php echo esc_textarea($d); ?></textarea></p>
    <p><label for="sw_focus_keyword"><strong>Focus keyword</strong> (for your reference only)</label><br>
      <input type="text" id="sw_focus_keyword" name="sw_focus_keyword" value="<?php echo esc_attr($k); ?>" style="width:100%"></p>
    <script>
    (function () {
      document.querySelectorAll('#sw-seo-box .sw-count').forEach(function (c) {
        var f = document.getElementById(c.dataset.for), max = +c.dataset.max;
        function u() { var n = f.value.length; c.textContent = '(' + n + ' / ' + max + ' characters)'; c.style.color = n > max ? '#b32d2e' : '#50575e'; }
        f.addEventListener('input', u); u();
      });
    })();
    </script>
    <?php
}

add_action('save_post', function ($id) {
    if (!isset($_POST['sw_seo_box_nonce']) || !wp_verify_nonce($_POST['sw_seo_box_nonce'], 'sw_seo_box')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($id) || !current_user_can('edit_post', $id)) return;
    foreach (['sw_seo_title' => '_sw_seo_title', 'sw_seo_desc' => '_sw_seo_desc', 'sw_focus_keyword' => '_sw_focus_keyword'] as $field => $key) {
        if (!isset($_POST[$field])) continue;
        $v = sanitize_text_field(wp_unslash($_POST[$field]));
        if ($v === '') delete_post_meta($id, $key); else update_post_meta($id, $key, $v);
    }
});
