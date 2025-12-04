class FooterContent extends HTMLElement{
    connectedCallback(){
        this.innerHTML=
            `<!-- Start Footer Top Area  -->
<div class="footer-top separator-top">
    <div class="container">
        <div class="row">
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Support</h5>

                    <div class="inner">
                        <p>
                        </p>
                        <ul class="support-list-item">
                            <li><a href="mailto:support@smarttrade.lk"><i class="fal fa-envelope-open"></i> support@smarttrade.lk</a></li>
                            <li><a href="tel:"><i class="fal fa-phone-alt"></i> Phone Number</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Account</h5>
                    <div class="inner">
                        <ul>
                            <li><a href="my-account.html">My Account</a></li>
                            <li><a href="sign-in.html">Login / Register</a></li>
                            <li><a href="cart.html">Cart</a></li>
                            <li><a href="#">Wishlist</a></li>
                            <li><a href="index.html">Shop</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Quick Link</h5>
                    <div class="inner">
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms Of Use</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
            <!-- Start Single Widget  -->
            <div class="col-lg-3 col-sm-6">
                <div class="axil-footer-widget">
                    <h5 class="widget-title">Download App</h5>
                    <div class="inner">
                        <div class="download-btn-group">

                            <div class="app-link">
                                <a href="#">
                                    <img src="assets/images/others/app-store.png" alt="App Store">
                                </a>
                                <a href="#">
                                    <img src="assets/images/others/play-store.png" alt="Play Store">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Single Widget  -->
        </div>
    </div>
</div>
<!-- End Footer Top Area  -->
<!-- Start Copyright Area  -->
<div class="copyright-area copyright-default separator-top">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-xl-4">
                <div class="social-share">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div class="col-xl-4 col-lg-12">
                <div class="copyright-left d-flex flex-wrap justify-content-center">
                    <ul class="quick-link">
                        <li>©2025. All rights reserved by <a target="_blank" href="#">SmartTrade</a>.</li>
                    </ul>
                </div>
            </div>
            <div class="col-xl-4 col-lg-12">
                <div class="copyright-right d-flex flex-wrap justify-content-xl-end justify-content-center align-items-center">
                    <span class="card-text">Accept For</span>
                    <ul class="payment-icons-bottom quick-link">
                        <li><img src="assets/images/icons/mastercard.png" alt="paypal cart"></li>
                        <li><img src="assets/images/icons/visa.png" alt="paypal cart"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Copyright Area  -->


<!-- Header Search Modal End -->
<div class="header-search-modal" id="header-search-modal">
    <button class="card-close sidebar-close"><i class="fas fa-times"></i></button>
    <div class="header-search-wrap">
        <div class="card-header">
            <form action="#">
                <div class="input-group">
                    <input type="search" class="form-control" name="prod-search" id="prod-search" placeholder="Search">
                    <button type="submit" class="axil-btn btn-bg-primary"><i class="far fa-search"></i></button>
                </div>
            </form>
        </div>
        <div class="card-body">
            <div class="search-result-header">
                <h6 class="title">1 Result Found</h6>
                <a href="#" class="view-all">View All</a>
            </div>
            <div class="psearch-results">
                <div class="axil-product-list">
                    <div class="thumbnail">
                        <a href="#">
                            <img src="./assets/images/product/product-03.png" alt="Product Image-1">
                        </a>
                    </div>
                    <div class="product-content">

                        <h6 class="product-title"><a href="#">Product Title-1</a></h6>
                        <div class="product-price-variant">
                            <span class="price current-price">Rs. 0.00</span>
                        </div>
                        <div class="product-cart">
                            <a href="#" class="cart-btn"><i class="fal fa-shopping-cart"></i></a>
                            <a href="#" class="cart-btn"><i class="fal fa-heart"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Header Search Modal End -->


<div class="cart-dropdown" id="cart-dropdown">
    <div class="cart-content-wrap">
        <div class="cart-header">
            <h2 class="header-title">Cart Review</h2>
            <button class="cart-close sidebar-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="cart-body">
            <ul class="cart-item-list" id="side-panal-cart-item-list">
                
            </ul>
        </div>
        <div class="cart-footer">
            <h3 class="cart-subtotal">
                <span class="subtotal-title">Subtotal:</span>
                <span class="subtotal-amount" id="side-panel-cart-sub-total">Rs. 0.00</span>
            </h3>
            <div class="group-btn">
                <a href="cart.html" class="axil-btn btn-bg-primary viewcart-btn">View Cart</a>
                <a href="checkout.html" class="axil-btn btn-bg-secondary checkout-btn">Checkout</a>
            </div>
        </div>
    </div>
</div>

<div class="closeMask"></div>`;
    }
}
customElements.define("footer-content",FooterContent);