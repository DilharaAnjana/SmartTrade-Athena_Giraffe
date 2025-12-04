class HeaderContent extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `<div class="axil-header-top">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-sm-6">
                <div class="header-top-dropdown">
                    <div class="dropdown">
                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            English
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">English</a></li>
                        </ul>
                    </div>
                    <div class="dropdown">
                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            LKR
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">LKR</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="header-top-link">
                    <ul class="quick-link">
                        <li><a href="#">Help</a></li>
                        <li><a href="sign-up.html">Join Us</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Start Mainmenu Area  -->
<div id="axil-sticky-placeholder"></div>
<div class="axil-mainmenu">
    <div class="container">
        <div class="header-navbar">
            <div class="header-brand">
                <a href="index.html" class="logo logo-dark">
                    <img src="assets/images/logo/logo.png" alt="Site Logo">
                </a>
                <a href="index.html" class="logo logo-light">
                    <img src="assets/images/logo/logo-light.png" alt="Site Logo">
                </a>
            </div>
            <div class="header-main-nav">
                <!-- Start Mainmanu Nav -->
                <nav class="mainmenu-nav">
                    <button class="mobile-close-btn mobile-nav-toggler"><i class="fas fa-times"></i></button>
                    <div class="mobile-nav-brand">
                        <a href="index.html" class="logo">
                            <img src="assets/images/logo/logo.png" alt="Site Logo">
                        </a>
                    </div>
                    <ul class="mainmenu">
                        <li class="menu-item-has-children">
                            <a href="#">Menu-1</a>
                            <ul class="axil-submenu">
                                <li><a href="#">Menu-1-Item-1</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="#">Menu-2</a>
                            <ul class="axil-submenu">
                                <li><a href="#">Menu-2-Item-1</a></li>
                            </ul>
                        </li>
                        <li class="menu-item-has-children">
                            <a href="#">Menu-3</a>
                            <ul class="axil-submenu">
                                <li><a href="#">Menu-3-Item-1</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Menu-4</a></li>
                        <li class="menu-item-has-children">
                            <a href="#">Menu-5</a>
                            <ul class="axil-submenu">
                                <li><a href="#">Menu-5-Item-1</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Menu-6</a></li>
                    </ul>
                </nav>
                <!-- End Mainmanu Nav -->
            </div>
            <div class="header-action">
                <ul class="action-list">
                    <li class="axil-search">
                        <a href="javascript:void(0)" class="header-search-icon" title="Search">
                            <i class="flaticon-magnifying-glass"></i>
                        </a>
                    </li>
                    <li class="wishlist">
                        <a href="#">
                            <i class="flaticon-heart"></i>
                        </a>
                    </li>
                    <li class="shopping-cart">
                        <a href="#" onclick="viewCart();"; class="cart-dropdown-btn">
                            <span class="cart-count">3</span>
                            <i class="flaticon-shopping-cart"></i>
                        </a>
                    </li>
                    <li class="my-account">
                        <a href="javascript:void(0)">
                            <i class="flaticon-person"></i>
                        </a>
                        <div class="my-account-dropdown">
                            <span class="title">QUICKLINKS</span>
                            <ul>
                                <li>
                                    <a href="my-account.html">My Account</a>
                                </li>
                                <li>
                                    <a href="#">Support</a>
                                </li>
                                <li>
                                    <a href="#">Language</a>
                                </li>
                            </ul>
                            <div class="login-btn">
                                <a href="sign-in.html" class="axil-btn btn-bg-primary">Login</a>
                            </div>
                            <div class="reg-footer text-center">No account yet? <a href="sign-up.html" class="btn-link">REGISTER HERE.</a></div>
                        </div>
                    </li>
                    <li class="axil-mobile-toggle">
                        <button class="menu-btn mobile-nav-toggler">
                            <i class="flaticon-menu-2"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- End Mainmenu Area -->`;
    }
}
customElements.define("header-content",HeaderContent);