<?php
/**
 * Plugin Name: Custom WooCommerce Modern Toast Notices
 * Plugin URI: https://github.com/AmirheydaripourOdin1133/Custom-WooCommerce-Modern-Notices 
 * Description: سیستم اعلان‌های توست مدرن، سریع و زیبا برای تمامی رویدادها، خطاها و افزودن به سبد خرید ووکامرس.
 * Version: 1.0.1
 * Author URI: https://wp-amir.ir
 * Author: Amir Heydaripour 
 * Text Domain: custom-wc-toast
 * Requires Plugins: woocommerce
 */

defined( 'ABSPATH' ) || exit;

class CWD_WC_Toast_Notices {

    const VERSION = '1.0.1';

    public static function init() {
        // تزریق نام محصول به دکمه‌های لوپ سبد خرید
        add_filter( 'woocommerce_loop_add_to_cart_args', array( __CLASS__, 'inject_product_data_attributes' ), 10, 2 );

        // لود فایل‌های استاتیک لوکال
        add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_assets' ) );
    }

    /**
     * افزودن نام محصول به دکمه‌ها جهت ساخت پیام شفاف
     */
    public static function inject_product_data_attributes( $args, $product ) {
        if ( $product instanceof WC_Product ) {
            $args['attributes'] = isset( $args['attributes'] ) && is_array( $args['attributes'] )
                ? $args['attributes']
                : array();

            $args['attributes']['data-product-name'] = esc_attr( wp_strip_all_tags( $product->get_name() ) );
        }
        return $args;
    }

    /**
     * ثبت و اتصال استایل‌ها و اسکریپت‌های لوکال
     */
    public static function enqueue_assets() {
        if ( is_admin() || ! class_exists( 'WooCommerce' ) ) {
            return;
        }

        $base_url = plugin_dir_url( __FILE__ );

        // Toastify CSS (لوکال)
        wp_enqueue_style(
            'cwd-toastify',
            $base_url . 'assets/css/toastify.min.css',
            array(),
            '1.12.0'
        );

        // Custom WC Toast CSS
        wp_enqueue_style(
            'cwd-wc-toast',
            $base_url . 'assets/css/wc-toast.css',
            array( 'cwd-toastify' ),
            self::VERSION
        );

        // Toastify JS (لوکال)
        wp_enqueue_script(
            'cwd-toastify',
            $base_url . 'assets/js/toastify.min.js',
            array(),
            '1.12.0',
            true
        );

        // Custom WC Toast JS (لوکال)
        wp_enqueue_script(
            'cwd-wc-toast',
            $base_url . 'assets/js/wc-toast.js',
            array( 'cwd-toastify', 'jquery' ),
            self::VERSION,
            true
        );

        // ارسال کانفیگ و ترجمه‌ها به JS
        wp_localize_script( 'cwd-wc-toast', 'CWD_Toast_Config', array(
            'cartUrl'      => function_exists( 'wc_get_cart_url' ) ? esc_url( wc_get_cart_url() ) : '',
            'cartText'     => __( 'مشاهده سبد', 'custom-wc-toast' ),
            'addedSimple'  => __( 'به سبد خرید اضافه شد.', 'custom-wc-toast' ),
            'addedProduct' => __( '«%s» به سبد خرید اضافه شد.', 'custom-wc-toast' ),
            'duration'     => 5000, // میلی‌ثانیه
        ) );
    }
}

add_action( 'plugins_loaded', array( 'CWD_WC_Toast_Notices', 'init' ) );
